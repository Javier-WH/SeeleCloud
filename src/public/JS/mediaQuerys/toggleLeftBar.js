let button = document.getElementById("button-toggle-leftBar");
let logo = document.getElementById("main-logo-container");
let leftBar = document.getElementById("left-bar-container");
let btnContainer = document.getElementById("btn-container");
let fileContainer = document.getElementById("file-container");
let message = document.getElementById("file-container-message");
let addressBar = document.getElementById("address-bar-container");





if (window.outerWidth < 600) {
    button.classList.add("hidden");
    logo.classList.add("hidden");
    leftBar.classList.add("hidden");
    btnContainer.classList.add("hidden");
    fileContainer.classList.add("hidden");
    message.classList.add("hidden");
    addressBar.classList.add("hidden");
}


function toggleLeftBar() {
    if (isHidden()) {
        button.classList.remove("hidden");
        logo.classList.remove("hidden");
        leftBar.classList.remove("hidden");
        btnContainer.classList.remove("hidden");
        fileContainer.classList.remove("hidden");
        message.classList.remove("hidden");
        addressBar.classList.remove("hidden");
    } else {
        button.classList.add("hidden");
        logo.classList.add("hidden");
        leftBar.classList.add("hidden");
        btnContainer.classList.add("hidden");
        fileContainer.classList.add("hidden");
        message.classList.add("hidden");
        addressBar.classList.add("hidden");
    }

}



function isHidden() {
    return button.offsetLeft == 0

}

button.addEventListener("click", () => {
    toggleLeftBar();
})