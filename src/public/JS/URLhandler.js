let CURRENT_URL = [];

export function getURL() {
    return CURRENT_URL.join('/');
}
export function setURL(url) {
    CURRENT_URL = url.split('/');
}
export function addFolder(folder) {
    CURRENT_URL.push(folder);
}
export function setBackURL() {
    CURRENT_URL.pop();
}