const container = document.getElementById("file-container");
const messageBox = document.getElementById("file-container-message");
const originalData = document.getElementById("originalData")

import { getURL } from "../URLhandler.js";



let FILTER_LIST = [];
let ORIGINAL_CONTAINER_DATA = [];

function isFilterActive() {
    return FILTER_LIST.length > 0;
}

function isFiltetedBy(word) {
    return FILTER_LIST.includes(word);
}

function addFilter(filter) {
    FILTER_LIST.push(filter);
}

export function removeFilter(filer) {
    let newFilterList = FILTER_LIST.filter(e => e != filer);
    FILTER_LIST = [...newFilterList];
    search();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getContainerElemens() {
    let htmlCollection = container.getElementsByClassName("file");

    let elementList = [];

    for (let i = 0; i < htmlCollection.length; i++) {
        let addressArray = htmlCollection[i].id.split("/")
        let dataTitle = addressArray[addressArray.length - 1];

        let file = document.createElement("div")
        file.setAttribute("class", htmlCollection[i].classList[0] + " " + htmlCollection[i].classList[1])
        file.setAttribute("id", htmlCollection[i].id)
        file.setAttribute("data-title", dataTitle);


        let img = document.createElement("img");
        img.setAttribute("src", htmlCollection[i].getElementsByClassName("file-logo")[0].src)
        img.setAttribute("class", "file-logo");

        let p = document.createElement("p");
        p.setAttribute("class", "file-title")
        p.innerText = htmlCollection[i].getElementsByClassName("file-title")[0].innerText

        file.appendChild(img);
        file.appendChild(p);

        elementList.push(file)

    }


    // console.log("URL: " + getURL())

    // for (let i = 0; i < elementList.length; i++) {

    //     elementList[i].id = elementList[i].id.replace(getURL() + "/", "")


    // };


    return elementList;
}
////////////////////////////////////////////////////////// bug aqui
function fillContainer(fileList) {
    container.innerHTML = ""
    for (let i = 0; i < fileList.length; i++) {


        // if (getURL() != "") {
        //     fileList[i].id = getURL() + "/" + fileList[i].id
        // }

        container.appendChild(fileList[i]);
    }
}

export function cleanAllFilters() {
    FILTER_LIST.length = 0;
}


export function setORIGINAL_CONTAINER_DATA() {

    ORIGINAL_CONTAINER_DATA = getContainerElemens();

}



function showMessage() {
    if (FILTER_LIST.length > 0) {
        messageBox.innerHTML = `<span id ="filterTag" >Filtros: </span>`;
        for (let i = 0; i < FILTER_LIST.length; i++) {
            messageBox.innerHTML += `<span class = "filterMessage" id = "${FILTER_LIST[i]}">${FILTER_LIST[i]}</span>`
        }
        messageBox.classList.remove("invisible");
    } else {
        messageBox.classList.add("invisible");
    }
}

export function runFilterMessage() {
    messageBox.addEventListener("click", e => {
        if (e.target.classList.contains("filterMessage")) {
            removeFilter(e.target.innerText);
            search();
        }
    })
}

////
export function search(word = "") {
    word = word.toLowerCase();
    fillContainer(ORIGINAL_CONTAINER_DATA);



    if (!isFiltetedBy(word) && word != "") {
        addFilter(word);

    }



    if (isFilterActive()) {
        let files = [];
        let elements = [];
        for (let i = 0; i < FILTER_LIST.length; i++) {
            files.length = 0;
            elements.length = 0;
            elements = getContainerElemens();

            for (let j = 0; j < elements.length; j++) {

                let file = elements[j].id.toLowerCase().split("/");
                if (file[file.length - 1].includes(FILTER_LIST[i])) {
                    files.push(elements[j]);
                }

            }
            fillContainer(files)
        }

    }

    showMessage();
}