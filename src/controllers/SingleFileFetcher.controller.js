const File= require("../models/file");

const SingleFileFetcherController=async(req, res)=>{
    const publicKey= req.params.publickey;

    try {
        const file= await File.findOne({publicKey: publicKey});

        if(!file) return res.status(500).send({error: "File not found with this public key"});

        const filepath= `${file.path}`;

        console.log(filepath);

        return res.download(filepath);

    } catch (error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
}

module.exports= SingleFileFetcherController