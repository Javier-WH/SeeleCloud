//verifica que el formato de audio esta soportado por la vista previa
export function suportedAudioFiles(file) {
    const supportedAudioList = [".mp3", ".wav", ".ogg"];
    file = file.toLowerCase();
    for (let i = 0; i < supportedAudioList.length; i++) {
        if (file.includes(supportedAudioList[i])) {
            return true;
        }
    }
    return false;
}

//verifica que el formato de imagen esta soportado por la vista previa
export function suportedImageFiles(file) {
    const supportedImageList = [".jpg", ".png", ".jpeg", ".gif", ".bmp"];
    file = file.toLowerCase();
    for (let i = 0; i < supportedImageList.length; i++) {
        if (file.includes(supportedImageList[i])) {
            return true;
        }
    }
    return false;
}

//verifica que el formato de video esta soportado por la vista previa
export function suportedVideoFiles(file) {
    const supportedVideoList = [".mp4", ".avi", ".wmv", ".mkv", ".3gp"];
    file = file.toLowerCase();
    for (let i = 0; i < supportedVideoList.length; i++) {
        if (file.includes(supportedVideoList[i])) {
            return true;
        }
    }
    return false;
}


//verifica que el formato de documento esta soportado por la vista previa
export function suportedDocumentFiles(file) {
    const supportedDocumentList = [".doc", ".ppt", ".xls", ".pdf"];
    file = file.toLowerCase();
    for (let i = 0; i < supportedDocumentList.length; i++) {
        if (file.includes(supportedDocumentList[i])) {
            return true;
        }
    }
    return false;
}


export function suportedFiles(file) {
    return suportedAudioFiles(file) || suportedVideoFiles(file) || suportedDocumentFiles(file) || suportedImageFiles(file);

}