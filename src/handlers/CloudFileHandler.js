"use strict";
const File = require("../models/file");
const {v4: uuid4} = require("uuid");
const processFile= require("../middleware/Upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("file-sharing-bucket");

class CloudFileHandler{
    constructor(options){

    }
    async save(req,res){
        try {
            await processFile(req, res);

            if (!req.file) {
              return res.status(400).send({ message: "Please upload a file!" });
            }
            const blob = bucket.file(req.file.originalname);
            const blobStream = blob.createWriteStream({
              resumable: false,
            });
            blobStream.on("error", (err) => {
              res.status(500).send({ message: err.message });
            });
            blobStream.on("finish", async (data) => {
              const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
              );
              try {
                await bucket.file(req.file.originalname).makePublic();

                const file= new File({
                    filename: req.file.filename,
                    path: publicUrl,
                    size: req.file.size,
                    publicKey: uuid4(),
                    privateKey: uuid4()
                });
                const response= await file.save();
    
                return res.json({file:`${process.env.APP_BASE_URL}/api/v1/private/file/download/${response.publicKey}`});
    

              } catch {
                return res.status(500).send({
                  message:
                    `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
                  url: publicUrl,
                });
              }
            


              res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
                url: publicUrl,
              });
            });
            blobStream.end(req.file.buffer);
          } catch (err) {
            res.status(500).send({
              message: `Could not upload the file: ${req.file.originalname}. ${err}`,
            });
          }
    }
}

module.exports= CloudFileHandler