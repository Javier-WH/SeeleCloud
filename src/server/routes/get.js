const path = require('path');
const express = require('express');
const router = express.Router();
///variables de ruta
const htmlRoute = (path.join(__dirname, "../../public/HTML/"));
//controlers
const fileControler = require(path.join(__dirname, "../controllers/fileController.js"))





router.get("/", (req, res) => {
    res.sendFile(path.join(htmlRoute + "index.html"));
});

router.get("/getFiles", (req, res) => {
    res.send(fileControler.getFiles(req.query));
})

module.exports = router;