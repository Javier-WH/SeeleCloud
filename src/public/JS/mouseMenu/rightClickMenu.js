const container = document.getElementById("file-container");
const menu = document.getElementById("rightMenu");

import { previewFile } from "../fetch/filePreview.js";
import { openLeftBarFolder } from "../leftBar/leftBar.js";
import { getSelected, setSelected } from "../fileContainer/fileContainer.js";
import { getFile, getFolder } from "../fetch/fileHander.js";
import { acceptDelete } from "../btnBar/btnBar.js";
import { deleteFile } from "../fetch/deleteFile.js";
import { deleteFolder } from "../fetch/deleteFolder.js";


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

        menu.classList.add("invisible");

        if (e.target.classList.contains("file")) {
            e.preventDefault();
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

    /////Borrar
    document.getElementById("li-borrar").addEventListener("click", () => {
        let isSelected = getSelected() != "";
        let isFile = isSelected ? !document.getElementById(getSelected()).classList.contains("folder") : false;
        if (isSelected) {
            let file = getSelected()
            acceptDelete(res => {
                if (res) {
                    if (isFile) {
                        deleteFile(file, response => {
                            if (response == "OK") {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'El archivo fue eliminado exitosamente',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } else {
                                Swal.fire({
                                    title: '¡¡¡Miau!!!',
                                    text: 'Ocurrió un error, no se pudo eliminar el archivo',
                                    imageUrl: 'IMAGES/SVG/CATlogo.svg',
                                    imageWidth: 400,
                                    imageHeight: 200,
                                    imageAlt: 'Custom image',
                                })
                            }
                        })
                    } else {
                        deleteFolder(file, response => {
                            if (response == "OK") {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'La carpeta fue eliminada exitosamente',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } else {
                                Swal.fire({
                                    title: '¡¡¡Miau!!!',
                                    text: 'Ocurrió un error, no se pudo eliminar la carpeta',
                                    imageUrl: 'IMAGES/SVG/CATlogo.svg',
                                    imageWidth: 400,
                                    imageHeight: 200,
                                    imageAlt: 'Custom image',
                                })
                            }
                        })


                    }
                } else {
                    Swal.fire({
                        title: '¡¡¡Miau!!!',
                        text: 'No has escrito correctamente "Eliminar, no se ha borrado nada',
                        imageUrl: 'IMAGES/SVG/CATlogo.svg',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                    })
                }
            })
        }

    });
}