const path = require('path');
const zipper = require("zip-local");
const fileHandler = require(path.join(__dirname, '../modules/fileHandler.js'));

function createFolder(URL) {
    let cleanURL = "D:/Respaldo Milagros/" + URL.url;
    return fileHandler.makeFolder(cleanURL);

}

function downloadFolder(URL, callback) {
    let cleanURL = URL.url == "ROOT" ? "ROOT" : "D:/Respaldo Milagros/" + URL.url;
    let zipAddress = path.join(__dirname, "../utility/files/file.zip");


    zipper.zip(cleanURL, function(error, zipped) {

        if (!error) {
            zipped.compress();

            zipped.save(zipAddress, function(error) {
                if (!error) {

                    callback(zipAddress);

                    setTimeout(() => {
                        fileHandler.deleteFile(zipAddress)
                    }, 5000);


                }
            });
        }
    });
}



function deleteFolder(URL, callback) {
    if (URL.url.includes("D:/Respaldo Milagros")) {
        throw "ACCESO DENEGADO, no se puede eliminar ese directorio";
    } else {
        let cleanURL = "D:/Respaldo Milagros/" + URL.url
        fileHandler.deleteFolder(cleanURL, res => {
            callback(res);
        })

    }
}

module.exports = { createFolder, downloadFolder, deleteFolder }