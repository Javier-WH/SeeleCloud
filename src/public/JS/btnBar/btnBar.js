import { previewFile } from "../fetch/filePreview.js";
import { uploadFile } from "../fetch/uploadFile.js";
import { deleteFile } from "../fetch/deleteFile.js";
import { deleteFolder } from "../fetch/deleteFolder.js";
import { getSelected } from "../fileContainer/fileContainer.js";
import { getURL, setURL, addFolder, setBackURL } from "../URLhandler.js";
import { createFolder } from "../fetch/folderHander.js";
import { openLeftBarFolder } from "../leftBar/leftBar.js";
import { getFile, getFolder } from "../fetch/fileHander.js";


export function runBtnBar() {

    document.getElementById("btn-preview").addEventListener("click", () => {
        let selected = getSelected();
        if (selected != "") {
            let isFile = !document.getElementById(selected).classList.contains("folder");
            if (isFile) {
                previewFile(selected);
            }
        }
    });

    document.getElementById("btn-newFolder").addEventListener("click", async() => {

        const { value: folderName } = await Swal.fire({
            title: 'Ingresa el nombre de la carpeta',
            input: 'text',
            inputPlaceholder: '¡¡Miau!! el nombre va aquí',
            inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'off'
            }
        })
        if (folderName) {

            let address = getURL() == "" ? folderName : getURL() + "/" + folderName;

            createFolder(address, response => {
                if (response == "OK") {
                    let refreshAddress = getURL();
                    openLeftBarFolder(refreshAddress);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Tu carpeta fue creada',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    openLeftBarFolder(refreshAddress);

                } else {
                    Swal.fire({
                        title: '¡¡¡Miau!!!',
                        text: response,
                        imageUrl: 'IMAGES/SVG/CATlogo.svg',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                    })
                }
            });
        }
    });

    document.getElementById("btn-download").addEventListener("click", () => {

        let fileAddres = getSelected().split("/");
        let fileName = fileAddres[fileAddres.length - 1];

        let isSelected = getSelected() != "";
        let isFile = isSelected ? !document.getElementById(getSelected()).classList.contains("folder") : false;

        if (isSelected) {
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
        }

    })

    document.getElementById("btn-upload").addEventListener("click", () => {
        let address = getURL();


        uploadFile(address);




    })

    document.getElementById("btn-delete").addEventListener("click", () => {
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
    })



}


async function acceptDelete(callback) {

    const { value: text } = await Swal.fire({
        title: 'Escribe "Eliminar" para borrar el elemento seleccionado',
        input: 'text',
        inputLabel: 'Advertencia, este proceso no se puede revertir',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
            maxlength: 10,
            autocapitalize: 'off',
            autocorrect: 'off'
        }
    })

    if (text) {
        if (text == "Eliminar") {
            callback(true);
        } else {
            callback(false);
        }
    }


}