import { getURL, setURL, addFolder, setBackURL } from "../URLhandler.js";
import { getFolders } from "../fetch/fileHander.js";
import { fillFileContainer } from "../fileContainer/fileContainer.js";



export async function runLeftBar() {

    ///llena la barra izquierda con las carpetas iniciales
    resetLeftBar();

    //evento click en las carpetas de la barra izquierda
    document.getElementById("leftBar-menu").addEventListener("click", e => {
        if (!e.target.classList.contains("leftBar-menu")) {

            if (e.target.classList.contains("unfolded")) {
                e.target.nextSibling.remove();
                e.target.classList.remove("unfolded");
                document.getElementById(`__IMG__${e.target.id.replace("__LB__", "")}`).src = "../../IMAGES/SVG/folder.svg" // cambia la imagen de la carpeta abierta
                setURL(e.target.id.replace("__LB__", ""));
                setBackURL();
                fillFileContainer();
            } else {
                setURL(e.target.id.replace("__LB__", ""));
                fillFileContainer();
                let subFolders = document.createElement("div");
                subFolders.setAttribute("class", "leftBar-menu");
                getFolders(getURL(), folderList => {
                    if (folderList.length > 0) {
                        e.target.classList.add("unfolded");
                        document.getElementById(`__IMG__${e.target.id.replace("__LB__", "")}`).src = "../../IMAGES/SVG/folder_open.svg" // cambia la imagen de la carpeta abierta
                        let html = "";
                        folderList.map(file => {
                            html += writeLeftBarFolders(file)
                        })
                        subFolders.innerHTML = html;
                        e.target.parentNode.insertBefore(subFolders, e.target.nextSibling);
                    }
                });
            }
        }
    })

    ////
    document.getElementById("left-barr-folder-root").addEventListener("click", resetLeftBar)
}

/////////////////////////////
export function resetLeftBar() {
    setURL("");
    fillFileContainer();
    let container = document.getElementById("leftBar-menu");
    container.innerHTML = ""
    getFolders(getURL(), files => {
        let html = ""
        files.map(file => {
            html += writeLeftBarFolders(file)
        });
        container.innerHTML = html;
    });
}



///////////////////////////////////
function writeLeftBarFolders(file) {
    let address = file.address.replace("D:/Respaldo Milagros//", "");
    address = address.replace("D:/Respaldo Milagros/", "");
    return `
            <div class="leftBar-folder" id="__LB__${address}">
                <div class="folder-flex">
                    <img src="IMAGES/SVG/folder.svg" class="left-bar-folder-logo" id="__IMG__${address}">
                    <span class="left-bar-folder-title">${file.name}</span>
                </div>
            </div>`
}

export function openLeftBarFolder(URL) {
    let folder = "__LB__" + URL;

    document.getElementById(folder).click();
}