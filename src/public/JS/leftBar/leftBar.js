import { getURL, setURL, addFolder, setBackURL } from "../URLhandler.js";
import { getFolders } from "../fetch/fileHander.js";
import { fillFileContainer } from "../fileContainer/fileContainer.js";
import { fillSearchBar } from "../searchBar/searchBar.js";
import { cleanURL } from "../urlCleaner/urlCleaner.js"



export async function runLeftBar() {

    ///llena la barra izquierda con las carpetas iniciales
    resetLeftBar();

    //evento click en las carpetas de la barra izquierda
    document.getElementById("leftBar-menu").addEventListener("click", e => {
        if (!e.target.classList.contains("leftBar-menu")) {
            document.getElementById("file-container-message").classList.add("invisible");
            if (e.target.classList.contains("unfolded")) {
                if (e.target.nextSibling) {
                    e.target.nextSibling.remove();
                }
                e.target.classList.remove("unfolded");
                document.getElementById(`__IMG__${e.target.id.replace("__LB__", "")}`).src = "../../IMAGES/SVG/icons/icon_folder.svg" // cambia la imagen de la carpeta abierta
                setURL(e.target.id.replace("__LB__", ""));
                setBackURL();
                fillFileContainer();
            } else {

                setURL(e.target.id.replace("__LB__", ""));
                fillFileContainer();
                let subFolders = document.createElement("div");
                subFolders.setAttribute("class", "leftBar-menu");
                getFolders(getURL(), folderList => {
                    e.target.classList.add("unfolded");
                    if (folderList.length > 0) {
                        document.getElementById(`__IMG__${e.target.id.replace("__LB__", "")}`).src = "../../IMAGES/SVG/icons/icon_folderOpen.svg" // cambia la imagen de la carpeta abierta
                        let html = "";
                        folderList.map(file => {
                            html += writeLeftBarFolders(file)
                        })
                        subFolders.innerHTML = html;
                        e.target.parentNode.insertBefore(subFolders, e.target.nextSibling);
                    }
                });
            }
            fillSearchBar(getURL());
        }
    })

    ////
    document.getElementById("left-barr-folder-root").addEventListener("click", resetLeftBar)
}

/////////////////////////////
export async function resetLeftBar() {
    setURL("");
    fillSearchBar();
    fillFileContainer();
    let container = document.getElementById("leftBar-menu");
    container.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    await getFolders(getURL(), files => {
        let html = ""
        files.map(file => {
            html += writeLeftBarFolders(file)
        });
        container.innerHTML = html;
    });
}



///////////////////////////////////
function writeLeftBarFolders(file) {
    // let address = file.address.replace("D:/Respaldo Milagros//", "");
    // address = address.replace("D:/Respaldo Milagros/", "");
    let address = cleanURL(file.address);

    return `
            <div class="leftBar-folder" id="__LB__${address}" >
                <div class="folder-flex">
                    <img src="IMAGES/SVG/icons/icon_folder.svg" class="left-bar-folder-logo" id="__IMG__${address}">
                    <span class="left-bar-folder-title">${file.name}</span>
                </div>
            </div>`
}

export function openLeftBarFolder(URL) {

    let folder = URL == "" ? "left-barr-folder-root" : "__LB__" + URL;
    try {
        document.getElementById(folder).click();

    } catch (error) {
        console.error("La dirección no existe");
        setTimeout(() => {
            document.getElementById("togle-loading-screen").classList.add("invisible");
        }, 1500);
    }
}