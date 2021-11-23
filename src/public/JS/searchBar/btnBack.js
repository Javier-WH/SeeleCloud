import { getURL, setURL, addFolder, setBackURL } from "../URLhandler.js";
import { openLeftBarFolder } from "../leftBar/leftBar.js";
const btn = document.getElementById("btn-back");

export function runButton() {
    // setInterval(() => {
    //     console.log(getURL());
    // }, 900);

    btn.addEventListener("click", () => {
        openLeftBarFolder(getURL());

    })

}