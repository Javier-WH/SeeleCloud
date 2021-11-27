const defaultBaseAddress = "D:/Respaldo Milagros";
let baseAddress = "D:/Respaldo Milagros";
// let baseAddress = "D:/Jdownloader";

export async function getBaseAddress(callback) {
    let ask = await fetch(`/getBaseAddress`);
    let response = await ask.text();
    let address = response[response.length - 1] == "/" ? response.slice(0, -1) : response;
    callback(address);
}


export function cleanURL(URL) {

    let address = URL.replace((baseAddress + "//"), "");
    address = address.replace((baseAddress + "/"), "");

    return address;
}

export function setBaseAddress(URL) {
    baseAddress = URL;
}
export function restoreBaseAddress() {
    baseAddress = defaultBaseAddress;
}