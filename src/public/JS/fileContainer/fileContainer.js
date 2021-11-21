import { getURL, setURL, addFolder, setBackURL } from "../URLhandler.js";
import { getAllFiles, getAllFilesOrdered } from "../fetch/fileHander.js";
import { openLeftBarFolder } from "../leftBar/leftBar.js";

const container = document.getElementById("file-container");

export function runFileContainer() {

    fillFileContainer();

    ///evento al hacer click sobre un archivo o carpeta
    document.getElementById("file-container").addEventListener("click", e => {
        if (e.target.id != "file-container") {

            if (e.target.classList.contains("folder")) {
                setURL(e.target.id);
                fillFileContainer();
                try {

                    openLeftBarFolder(e.target.id);
                } catch (error) {

                } /////////////////////////////////////////////////////////////////////<=revisar
            } else {}
        }
    })

}

export function fillFileContainer() {
    let html = "";
    getAllFilesOrdered(getURL(), files => {
        files.map(file => {
            let address = file.address.replace("D:/Respaldo Milagros//", "");
            address = address.replace("D:/Respaldo Milagros/", "");

            let icon = file.type == "folder" ? "IMAGES/PNG/folder.png" : `IMAGES/PNG/icon_${file.icon}.png`;
            let type = file.type == "folder" ? "folder" : "";
            html += `
             <div class="file ${type}" id="${address}">
                <img src="${icon}" alt="" class="file-logo">
                <p class="file-title">${file.name}</p>
            </div>
            `
        })
        container.innerHTML = html;
    })
}