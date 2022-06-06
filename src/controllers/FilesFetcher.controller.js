const File= require("../models/file");

const FilesFetcherController=async(req, res)=>{

    try {
        const files= await File.find().select(["filename","publicKey","privateKey"])


        return res.json(files);

    } catch (error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
}

module.exports= FilesFetcherController