
const router= require('express').Router();
const path= require("path");
const File= require("../models/file");
const multer= require('multer');
const {v4: uuid4}= require('uuid');
const {unlinkFile}= require("../utils/FileHandler")

let storage= multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),
    filename:(req,file,cb)=>{
        const uniqueName= `${Date.now()}-${Math.random()*1E9}${path.extname(file.originalname)}`
        cb(null,uniqueName);
    }
   
});

let upload= multer({
    storage,
    limits: {fileSize: 1000*100000}
}).single('myFile')

router.post("/",(req,res)=>{

    //store file
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

       return res.json({file:`${process.env.APP_BASE_URL}/files/${response.publicKey}`});
    });
});


router.get("/download/:publickey",async(req,res)=>{

    const publicKey= req.params.publickey;

    try {
        const file= await File.findOne({publicKey: publicKey});

    if(!file) return res.status(500).send({error: "File not found with this public key"});

    const filepath= `${__dirname}/../${file.path}`;

    console.log(filepath);

    return res.download(filepath);
        
    } catch (error) {
        return res.status(500).send({error: "Internal Server Error"});
    }

});

router.get("/delete/:privatekey",async(req,res)=>{
    const privateKey= req.params.privatekey;

    try {
        const file= await File.findOne({privateKey: privateKey});

        if(!file) return res.status(500).send({error: "File not found with this public key"});
        
        
        await file.remove()

        const filepath= `${__dirname}/../${file.path}`;

         unlinkFile(filepath);

        return res.send("Removed Successfully")
        
    } catch (error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});




module.exports= router;