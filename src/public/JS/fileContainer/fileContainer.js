import { getURL, setURL, addFolder, setBackURL } from "../URLhandler.js";
import { getAllFiles, getAllFilesOrdered } from "../fetch/fileHander.js";
import { openLeftBarFolder } from "../leftBar/leftBar.js";
import { fillSearchBar } from "../searchBar/searchBar.js";
import { previewFile } from "../fetch/filePreview.js";
const messageBox = document.getElementById("file-container-message");
const container = document.getElementById("file-container");

let SELECTED = "";

export function runFileContainer() {



    ///evento al hacer doble-click sobre un archivo o carpeta
    document.getElementById("file-container").addEventListener("dblclick", e => {
        if (e.target.id != "file-container") {
            if (e.target.classList.contains("folder")) {
                setURL(e.target.id);
                fillFileContainer();
                fillSearchBar(getURL());
                try {
                    openLeftBarFolder(e.target.id);
                } catch (error) {

                } /////////////////////////////////////////////////////////////////////<=revisar
            } else {
                previewFile(e.target.id);
            }
        }
    })

    /////evento al hacer click sobre un archivo o carpeta

    document.getElementById("file-container").addEventListener("click", e => {
            if (e.target.id != "file-container") {
                cleanSelected();
                SELECTED = e.target.id;
                e.target.classList.add("selected");
            }
        })
        //al hacer click fuera del contenedor de los archvos

    window.addEventListener("click", e => {
        if (!e.target.classList.contains("file")) {
            cleanSelected();
        }
    })

    /////al hacer click sobre el mensaje de filtro

    messageBox.addEventListener("click", () => {
        messageBox.classList.add("invisible");
        fillFileContainer();
    })

}
//limpia la seleccion
function cleanSelected() {
    SELECTED = "";
    let fileList = document.getElementsByClassName("file");
    // console.log(fileList[2])
    for (let i = 0; i < fileList.length; i++) {
        fileList[i].classList.remove("selected");
    }
}
//llena el contenedor con todas las carpetas
export function fillFileContainer() {
    let html = "";
    container.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    getAllFilesOrdered(getURL(), files => {
        files.map(file => {
            let address = file.address.replace("D:/Respaldo Milagros//", "");
            address = address.replace("D:/Respaldo Milagros/", "");

            let icon = file.type == "folder" ? "IMAGES/SVG/icons/icon_folder.svg" : `IMAGES/SVG/icons/icon_${file.icon}.svg`;
            let type = file.type == "folder" ? "folder" : "";
            html += `
            <div class="file ${type}" id="${address}" data-title="${file.name}">
            <img src="${icon}" alt="" class="file-logo">
            <p class="file-title">${file.name}</p>
            </div>
            `

        })
        container.innerHTML = html;
        cleanSelected();
    })
}

export function getSelected() {
    return SELECTED;
}