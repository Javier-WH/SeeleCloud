const container = document.getElementById("file-container");
const messageBox = document.getElementById("file-container-message");
import { fillFileContainer } from "../fileContainer/fileContainer.js";
// const bar = document.getElementById("search-bar");
import { getURL } from "../URLhandler.js";


//////////////////////reparar bug cuando se hacen dos busquedas seguidas
export function search(word = "") {
    let htmlCollection = container.getElementsByClassName("file");

    word = word.toLowerCase()
    let elementList = [...htmlCollection];
    let fileList = [];

    for (let i = 0; i < elementList.length; i++) {
        elementList[i].id = elementList[i].id.replace(getURL() + "/", "")
    }


    for (let i = 0; i < elementList.length; i++) {
        if (elementList[i].id.toLowerCase().includes(word)) {
            fileList.push(elementList[i])
        }
    }



    fillSearch(fileList);
    setMessage(word);


}



/////////////////////////


function fillSearch(fileList) {
    container.innerHTML = ""

    for (let i = 0; i < fileList.length; i++) {
        if (getURL() != "") {
            fileList[i].id = getURL() + "/" + fileList[i].id
        }
        container.appendChild(fileList[i]);
    }
}


////////////////

function setMessage(message) {

    if (messageBox.innerText == "") {
        messageBox.innerText = `Se ha aplicado el filtro "${message}"`;
    } else {
        messageBox.innerText += `... Y se ha aplicado el filtro "${message}"`;
    }
    messageBox.classList.remove("invisible");
}