"use strict";
const File = require("../models/file");
const {v4: uuid4} = require("uuid");
const processFile= require("../middleware/Upload");

class LocalFileHandler{
    constructor(options){
    }

    async save(req,res){
        
        try{
            await processFile(req,res);
            if(!req.file) return res.status(500).json({error: "All Fields Are Requires"});
            const file= new File({
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size,
                publicKey: uuid4(),
                privateKey: uuid4()
            });
            const response= await file.save();

            return res.json({file:`${process.env.APP_BASE_URL}/api/v1/private/file/download/${response.publicKey}`});

        }catch(e){
            console.log("err",e);
            return res.status(500).json({error: "Unwanted Error Occours"});
        }
    }

}

module.exports= LocalFileHandler