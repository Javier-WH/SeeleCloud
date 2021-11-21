const path = require('path');
const fileHandler = require(path.join(__dirname, '../modules/fileHandler.js'));

function getFiles(URL) {
    try {
        let cleanURL = URL.url == "ROOT" ? "D:/Respaldo Milagros" : "D:/Respaldo Milagros/" + URL.url;
        let filesArray = fileHandler.getFiles(cleanURL);
        return JSON.stringify(filesArray);

    } catch (error) {
        return JSON.stringify({ "ERROR": "Invalid Address" });
    }
}


module.exports = {
    getFiles
}