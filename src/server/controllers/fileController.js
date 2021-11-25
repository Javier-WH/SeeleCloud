const path = require('path');
const { getfileName } = require(path.join(__dirname, '../utility/getFileName.js'))
const { execSync } = require('child_process');

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

function getFile(URL) {
    let cleanURL = "D:/Respaldo Milagros/" + URL.url;
    let ext = path.extname(cleanURL).toLowerCase();


    if (ext == ".pdf" || ext == ".jpg" || ext == ".jpeg" || ext == ".gif" || ext == ".png" || ext == ".mp3" || ext == ".ogg" || ext == ".wav" || ext == ".mp4" || ext == ".avi" || ext == ".wmv" || ext == ".mkv" || ext == ".3gp") {
        return cleanURL;
    } else if (ext == ".doc" || ext == ".docx" || ext == ".ppt" || ext == ".pptx" || ext == ".xls" || ext == ".xlsx") {

        fileName = getfileName(URL.url);

        let outdir = path.join(__dirname, '../utility/files');

        let command = `soffice --convert-to pdf --outdir "${outdir}" "${cleanURL}"`;

        let output = execSync(command, { encoding: 'utf-8' });

        let fileDir = outdir + "\\" + fileName;

        setTimeout(() => {
            fileHandler.deleteFile(fileDir);
        }, 10000);

        return fileDir;

    } else {
        return path.join(__dirname, "./VPND.pdf");

    }

}

function downloadFile(URL) {
    let cleanURL = URL.url == "ROOT" ? "ROOT" : "D:/Respaldo Milagros/" + URL.url;
    if (cleanURL != "ROOT") {
        return cleanURL;
    }
}

function uploadFile({ route, fileName }, callback) {

    let newPath = "D:/Respaldo Milagros/" + route + "/" + fileName;
    let oldPath = path.join(__dirname, "../utility/files/" + fileName)

    fileHandler.moveFile(oldPath, newPath, () => {
        callback("OK");
    })

}

function deleteFile({ url }, callback) {

    let fileAddress = "D:/Respaldo Milagros/" + url;
    fileHandler.deleteFile(fileAddress);
    callback("OK");
}



module.exports = {
    getFiles,
    getFile,
    downloadFile,
    uploadFile,
    deleteFile
}