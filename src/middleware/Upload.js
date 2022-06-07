const util = require("util");
const multer = require("multer");
const path = require("path");

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


let processFileMiddleware = util.promisify(upload);


module.exports = processFileMiddleware;