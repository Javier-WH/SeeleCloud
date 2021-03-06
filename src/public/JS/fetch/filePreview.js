import { suportedAudioFiles, suportedImageFiles, suportedVideoFiles, suportedDocumentFiles, suportedFiles, detectMob } from "../utility.js";

export async function previewFile(URL) {

    if (suportedDocumentFiles(URL) && detectMob()) {
        Swal.fire({
            title: '¡¡¡Miau!!!',
            text: 'No se puede previsualizar PDF ni documentos de MS-Office en navegadores moviles',
            imageUrl: 'IMAGES/SVG/CATlogo.svg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        });
    } else if (suportedFiles(URL)) {
        document.getElementById("togle-loading-screen").classList.remove("invisible");
        let ask = await fetch(`/preview?url=${URL}`);


        let response = await ask.blob();
        let file = window.URL.createObjectURL(response);
        document.getElementById("togle-loading-screen").classList.add("invisible");
        let frame = "";
        let width = "680px"
        if (suportedImageFiles(URL)) {
            frame = `<img src="${file}" id="img-preview">`
            width = "800px"
        } else if (suportedAudioFiles(URL)) {
            frame = `<audio controls="controls" autoplay>
            <source src="${file}" type="audio/mp3">
            </audio>`
        } else if (suportedVideoFiles(URL)) {
            frame = `<video width="420" height="340" controls autoplay>
            <source src="${file}" type="video/mp4">
            </video>`
        } else if (suportedDocumentFiles(URL)) {

            frame = `<iframe id="iframe-preview" src="${file}"></iframe>`;
            width = "600px";

        }

        Swal.fire({
            title: 'Vista Previa',
            html: frame,
            width: width,
            backdrop: `
            rgb(46, 188, 224)
            url("IMAGES/SVG/CATlogo.svg")
            left top
            no-repeat
            `
        });

    } else {
        Swal.fire({
            title: '¡¡¡Miau!!!',
            text: 'El formato de ese archivo no está soportado (todavía)',
            imageUrl: 'IMAGES/SVG/CATlogo.svg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
    }
}