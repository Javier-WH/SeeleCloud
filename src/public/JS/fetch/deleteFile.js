import { openLeftBarFolder } from "../leftBar/leftBar.js";
import { getURL } from "../URLhandler.js";

export async function deleteFile(URL, callback) {
    let refreshURL = getURL();
    openLeftBarFolder(refreshURL);
    let fileData = { "url": URL }
    let fileAddress = await JSON.stringify(fileData);
    let ask = await fetch("/deleteFile", {
        method: "DELETE",
        body: fileAddress,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    let response = await ask.text();
    openLeftBarFolder(refreshURL);
    callback(response);
}