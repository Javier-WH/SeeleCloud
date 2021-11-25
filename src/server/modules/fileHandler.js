const fs = require('fs');
const { choseIcon } = require("./iconHandler.js");

//obtiene todos los archivos de una carpeta
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

//regresa un unico archivo

function getFile(URL) {
    const file = fs.readFileSync(URL);
    return file;
}

//elimina un archivo

function deleteFile(url) {

    try {
        fs.unlinkSync(url);

    } catch (err) {

        console.error(err);
    }
}
//mueve un archivo

function moveFile(oldPath, newPath, callback) {
    fs.rename(oldPath, newPath, () => {
        callback();
    })

}

//crea una carpeta

function makeFolder(url) {
    if (!fs.existsSync(url)) {
        fs.mkdirSync(url);
        return "OK";
    }
    return "Una Carpeta con ese nombre ya existe";
}



//elimina la carpeta

function deleteFolder(url, callback) {
    fs.rmdir(url, { recursive: true }, (err) => {
        if (err) {
            console.error(err);
        }
        callback();
    });

}


module.exports = {
    getFiles,
    getFile,
    deleteFile,
    makeFolder,
    moveFile,
    deleteFolder
}