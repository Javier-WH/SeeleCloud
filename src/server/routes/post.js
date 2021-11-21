const express = require('express')
const router = express.Router();


router.get("/post", (req, res) => {
    res.send("posteando");
})

module.exports = router;