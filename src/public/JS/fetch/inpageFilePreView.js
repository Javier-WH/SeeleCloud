import { suportedAudioFiles, suportedImageFiles, suportedVideoFiles, suportedDocumentFiles, suportedFiles, detectMob } from "../utility.js";




export async function inPagePreviewFile(URL) {


    let frame = "";
    if (suportedFiles(URL)) {


        let ask = await fetch(`/preview?url=${URL}`);

        let response = await ask.blob();
        let file = window.URL.createObjectURL(response);

        if (suportedDocumentFiles(URL) && detectMob()) {
            frame = `<span>'No se puede previsualizar PDF ni documentos de MS-Office en navegadores moviles</span>`;
        } else if (suportedImageFiles(URL)) {
            frame = `<img src="${file}" id="img-preview">`

        } else if (suportedAudioFiles(URL)) {
            frame = `<audio controls="controls" autoplay id="previewVideo">
                        <source src="${file}" type="audio/mp3">
                    </audio>`
        } else if (suportedVideoFiles(URL)) {
            frame = `<video width="410" height="330" controls autoplay id="previewVideo">
                        <source src="${file}" type="video/mp4">
                    </video>`
        } else if (suportedDocumentFiles(URL)) {
            frame = `<iframe id="iframe-preview" src="${file}"></iframe>`;

        }

        return frame;

    } else {
        return `<span>El formato seleccionado no está soportado</span>`;
    }
}