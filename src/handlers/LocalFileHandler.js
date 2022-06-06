
"use strict";
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const {v4: uuid4} = require("uuid");


let storage= multer.diskStorage({
    destination:(req,file,cb)=>cb(null,`${__dirname}/../../store/uploads`),
    filename:(req,file,cb)=>{
        const uniqueName= `${Date.now()}-${Math.random()*1E9}${path.extname(file.originalname)}`
        cb(null,uniqueName);
    }

});

let upload= multer({
    storage,
    limits: {fileSize: 1000*100000}
}).single('myFile')


class LocalFileHandler{
    constructor(options){
    }

    save(req,res){
        upload(req,res,async(err)=>{
            if(!req.file) return res.status(500).json({error: "All Fields Are Requires"});

            if(err){
                return res.status(500).json({error: err.message});
            }
            // Store into Database
            const file= new File({
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size,
                publicKey: uuid4(),
                privateKey: uuid4()
            });
            const response= await file.save();

            return res.json({file:`${process.env.APP_BASE_URL}/api/v1/private/file/download/${response.publicKey}`});
        });
    }

}

module.exports= LocalFileHandler