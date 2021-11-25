export async function createFolder(URL = "ROOT", callback) {
    let ask = await fetch(`/createFolder?url=${URL}`);
    let response = await ask.text();
    if (response.ERROR) {
        console.error(response.ERROR);
    } else {
        callback(response);
    }
}