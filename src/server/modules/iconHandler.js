function choseIcon(fileName) {
    fileName = fileName.toLowerCase();
    if (fileName.includes(".doc") || fileName.includes(".docx")) {
        return "word";
    } else if (fileName.includes(".ppt") || fileName.includes(".pptx")) {
        return "powerPoint";
    } else if (fileName.includes(".xls") || fileName.includes(".xlsx")) {
        return "excel";
    } else if (fileName.includes(".exe")) {
        return "exe";
    } else if (fileName.includes(".html")) {
        return "html";
    } else if (fileName.includes(".jpeg") || fileName.includes(".jpg") || fileName.includes(".png") || fileName.includes(".bmp") || fileName.includes(".gif")) {
        return "img";
    } else if (fileName.includes(".mp3") || fileName.includes(".wav") || fileName.includes(".ogg")) {
        return "music";
    } else if (fileName.includes(".mp4") || fileName.includes(".3gp")) {
        return "video";
    } else if (fileName.includes(".pdf")) {
        return "pdf";
    } else if (fileName.includes(".tmp")) {
        return "tmp";
    } else if (fileName.includes(".zip") || fileName.includes(".rar")) {
        return "zip";
    } else {
        return "file";
    }

}

module.exports = { choseIcon };