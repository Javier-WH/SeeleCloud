import { getURL } from "../URLhandler.js";
import { openLeftBarFolder } from "../leftBar/leftBar.js";
const container = document.getElementById("file-container");

export function runDropFiles() {
    container.addEventListener("dragover", e => {
        e.preventDefault();

    });



    container.addEventListener("drop", e => {
        e.preventDefault();
        let file = e.dataTransfer.files[0]
        uploadFile(file, getURL());
    })

}


async function uploadFile(file, URL) {

    document.getElementById("file-container").innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    let data = new FormData();
    data.append("file", file);
    data.append("route", URL)
    data.append("fileName", file.name)

    let ask = await fetch("/upload", {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'multipart/form-data'
        },
    });
    openLeftBarFolder(URL);
    openLeftBarFolder(URL);
}