const File= require("../models/file");
const {unlinkFile}= require("../../utils/FileHandler")


const FileDeleteController= async(req,res)=>{
    const privateKey= req.params.privatekey;

    try {
        const file= await File.findOne({privateKey: privateKey});

        if(!file) return res.status(500).send({error: "File not found with this public key"});


        await file.remove()

        const filepath= `${file.path}`;

        unlinkFile(filepath);

        return res.send("Removed Successfully")

    } catch (error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
}

module.exports= FileDeleteController