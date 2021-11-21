function choseIcon(fileName) {
    fileName = fileName.toLowerCase();
    if (fileName.includes(".doc") || fileName.includes(".docx")) {
        return "word";
    } else if (fileName.includes(".ppt") || fileName.includes(".pptx")) {
        return "powerPoint";
    } else if (fileName.includes(".xls") || fileName.includes(".xlsx")) {
        return "excel";
    } else if (fileName.includes(".3gp")) {
        return "3gp";
    } else if (fileName.includes(".xls") || fileName.includes(".xlsx")) {
        return "excel";
    } else if (fileName.includes(".bmp")) {
        return "bmp";
    } else if (fileName.includes(".exe")) {
        return "exe";
    } else if (fileName.includes(".gif")) {
        return "gif";
    } else if (fileName.includes(".html")) {
        return "html";
    } else if (fileName.includes(".jpeg")) {
        return "jpeg";
    } else if (fileName.includes(".jpg")) {
        return "jpg";
    } else if (fileName.includes(".mp3")) {
        return "mp3";
    } else if (fileName.includes(".mp4")) {
        return "mp4";
    } else if (fileName.includes(".ogg")) {
        return "ogg";
    } else if (fileName.includes(".pdf")) {
        return "pdf";
    } else if (fileName.includes(".png")) {
        return "png";
    } else if (fileName.includes(".rar")) {
        return "rar";
    } else if (fileName.includes(".tmp")) {
        return "tmp";
    } else if (fileName.includes(".wav")) {
        return "wav";
    } else if (fileName.includes(".zip")) {
        return "zip";
    } else {
        return "file";
    }

}

module.exports = { choseIcon };