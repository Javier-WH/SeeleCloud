import { openLeftBarFolder } from "../leftBar/leftBar.js";
export async function uploadFile(URL) {

    const { value: file } = await Swal.fire({
        title: 'Selecciona el archivo que quieres guardar',
        input: 'file',
        inputAttributes: {
            'accept': '*/*',
            'aria-label': 'Upload your profile picture'
        }
    })

    if (file) {
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
        })
        openLeftBarFolder(URL);

        let response = await ask.text();

        if (response == "OK") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tu archivo se guardó satisfactoriamente',
                showConfirmButton: false,
                timer: 1500
            })


            openLeftBarFolder(URL);

        }
    }


}