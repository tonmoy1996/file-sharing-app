
const FileFactoryHandler= require('../factory/FileFactoryHandler');

const FileSaveController=(req,res)=>{
    const localFileFactory= new FileFactoryHandler();
    localFileFactory.createFileHandler({
        type: process.env.FILE_UPLOAD_TYPE
    });
    console.log(localFileFactory.fileHandlerClass)
    const fileObj= new localFileFactory.fileHandlerClass()
    fileObj.save(req,res);

}

module.exports=FileSaveController

