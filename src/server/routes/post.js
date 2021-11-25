const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();

const fileControler = require(path.join(__dirname, "../controllers/fileController.js"))
const folderControler = require(path.join(__dirname, "../controllers/folderController.js"))


const storage = multer.diskStorage({
    destination: path.join(__dirname, "../utility/files"),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


router.post("/upload", multer({ storage, dest: "fileContainer" }).single("file"), (req, res) => {
    fileControler.uploadFile(req.body, response => {
        res.send(response);
    });
})

module.exports = router;