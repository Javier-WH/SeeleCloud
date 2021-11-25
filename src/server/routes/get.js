const path = require('path');
const express = require('express');
const router = express.Router();
///variables de ruta
const htmlRoute = (path.join(__dirname, "../../public/HTML/"));
//controlers
const fileControler = require(path.join(__dirname, "../controllers/fileController.js"))
const folderControler = require(path.join(__dirname, "../controllers/folderController.js"))







router.get("/", (req, res) => {
    res.sendFile(path.join(htmlRoute + "index.html"));
});

router.get("/getFiles", (req, res) => {
    res.send(fileControler.getFiles(req.query));
});

router.get("/preview", (req, res) => {
    let file = fileControler.getFile(req.query)
    res.download(file)
});

router.get("/createFolder", (req, res) => {
    res.send(folderControler.createFolder(req.query))
});

router.get("/downloadFile", (req, res) => {
    res.download(fileControler.downloadFile(req.query));

})
router.get("/downloadFolder", (req, res) => {


    folderControler.downloadFolder(req.query, response => { res.download(response) });


})

module.exports = router;