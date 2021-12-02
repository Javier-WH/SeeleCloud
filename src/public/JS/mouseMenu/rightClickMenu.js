const container = document.getElementById("file-container");
const menu = document.getElementById("rightMenu");

import { previewFile } from "../fetch/filePreview.js";
import { openLeftBarFolder } from "../leftBar/leftBar.js";
import { getSelected, setSelected } from "../fileContainer/fileContainer.js";
import { getFile, getFolder } from "../fetch/fileHander.js";


export function runRightClickMenu() {
    //limpia el menu cuando se da click fuera de este
    window.addEventListener("click", e => {

        menu.classList.add("invisible");

    });
    window.addEventListener("contextmenu", e => {
        if (!e.target.classList.contains("file")) {
            menu.classList.add("invisible");
        }
    });

    //menu
    container.addEventListener("contextmenu", e => {
        e.preventDefault();

        menu.classList.add("invisible");

        if (e.target.classList.contains("file")) {
            setSelected(e.target.id);

            menu.style.left = e.clientX + "px";
            menu.style.top = e.clientY + "px";
            menu.classList.remove("invisible");
        }

    })

    ///////////////listener de las opvciones del menu///////////

    //abrir

    document.getElementById("li-abrir").addEventListener("click", () => {

        let file = document.getElementById(getSelected());

        if (file.classList.contains("folder")) {
            openLeftBarFolder(getSelected());
        } else {
            previewFile(getSelected());
        }

    });

    //descargar
    document.getElementById("li-descargar").addEventListener("click", () => {

        let file = document.getElementById(getSelected());
        let isFile = !file.classList.contains("folder");
        let fileAddres = getSelected().split("/");
        let fileName = fileAddres[fileAddres.length - 1];

        if (isFile) {
            getFile(getSelected(), response => {
                if (response) {
                    let a = document.createElement("a");
                    let file = window.URL.createObjectURL(response);
                    a.setAttribute("class", "invisible");
                    a.setAttribute("href", file);
                    a.setAttribute('download', fileName);
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }
            })
        } else {
            getFolder(getSelected(), response => {
                if (response) {
                    let a = document.createElement("a");
                    let file = window.URL.createObjectURL(response);
                    a.setAttribute("class", "invisible");
                    a.setAttribute("href", file);
                    a.setAttribute('download', fileName);
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }
            })
        }

    });










}