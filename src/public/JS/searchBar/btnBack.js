import { getURL, setURL, addFolder, setBackURL } from "../URLhandler.js";
import { openLeftBarFolder } from "../leftBar/leftBar.js";
const btn = document.getElementById("btn-back");

export function runButton() {


    btn.addEventListener("click", () => {
        openLeftBarFolder(getURL());

    })

}