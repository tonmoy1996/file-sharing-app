const SingleFileFetcher= require("../controllers/SingleFileFetcher.controller")
const FilesFetcher= require("../controllers/FilesFetcher.controller")
const FileSaveController= require("../../src/controllers/FileSave.controller")
const FileDeleteController= require("../../src/controllers/FileDelete.controller")

const router= require("express").Router();

router.get("/files",FilesFetcher);
router.post("/file/save",FileSaveController);
router.get("/file/download/:publickey",SingleFileFetcher);
router.get("/file/delete/:privatekey",FileDeleteController);



module.exports=router