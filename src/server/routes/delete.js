const path = require('path');
const express = require('express');
const router = express.Router();
const fileControler = require(path.join(__dirname, "../controllers/fileController.js"))
const folderControler = require(path.join(__dirname, "../controllers/folderController.js"))




router.delete("/deleteFile", express.json(), (req, res) => {

    fileControler.deleteFile(req.body, response => {
        res.send(response);
    });

})

router.delete("/deleteFolder", express.json(), (req, res) => {
    folderControler.deleteFolder(req.body, response => {
        res.send(response);
    })
})

module.exports = router;