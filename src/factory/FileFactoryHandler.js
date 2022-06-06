"use strict";
const LocalFileHandler= require("../handlers/LocalFileHandler");
const CloudFileHandler= require("../handlers/CloudFileHandler");
class FileFactoryHandler{

}

FileFactoryHandler.prototype.fileHandlerClass=LocalFileHandler;

FileFactoryHandler.prototype.createFileHandler=(options)=>{
    switch(options.type){
        case "Local":
            this.fileHandlerClass = LocalFileHandler;
            break;
        case "truck":
            this.fileHandlerClass = CloudFileHandler;
            break;
    }

    return new this.fileHandlerClass( options );
}

module.exports= FileFactoryHandler