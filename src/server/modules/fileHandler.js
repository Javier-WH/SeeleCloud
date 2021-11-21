const fs = require('fs');
const { choseIcon } = require("./iconHandler.js");

function getFiles(URL) {
    let fileList = fs.readdirSync(URL);
    let response = [];

    fileList.map(file => {
        let type = fs.lstatSync(URL + "\\" + file).isDirectory();
        let object = {
            name: file,
            address: URL.replace(/\\/g, "/") + "/" + file,
            type: type ? "folder" : "file",
            icon: type ? "folder" : choseIcon(file)
        };

        response.push(object);
    });

    return response;
}


module.exports = {
    getFiles
}