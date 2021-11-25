import { openLeftBarFolder } from "../leftBar/leftBar.js";
import { getURL } from "../URLhandler.js";

export async function deleteFolder(URL, callback) {
    let refreshURL = getURL();
    openLeftBarFolder(refreshURL);
    let folderData = { "url": URL }
    let folderAddress = await JSON.stringify(folderData);
    let ask = await fetch("/deleteFolder", {
        method: "DELETE",
        body: folderAddress,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    let response = await ask.text();
    openLeftBarFolder(refreshURL);
    callback(response);
}