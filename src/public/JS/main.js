import { runLeftBar } from "./leftBar/leftBar.js";
import { runFileContainer, getSelected } from "./fileContainer/fileContainer.js";
import { runButton } from "./searchBar/btnBack.js"
import { runSearchBar } from "./searchBar/searchBar.js"
import { runBtnBar } from "./btnBar/btnBar.js"
import { getBaseAddress, setBaseAddress } from "./urlCleaner/urlCleaner.js";
import { runRightClickMenu } from "./mouseMenu/rightClickMenu.js"

document.getElementById("togle-loading-screen").classList.add("invisible");


getBaseAddress(res => {
    setBaseAddress(res)
    runButton();
    runLeftBar();
    runFileContainer();
    runSearchBar();
    runBtnBar();
    runRightClickMenu();
    document.getElementById("file-container-message").innerText = "";

});

// runButton();
// runLeftBar();
// runFileContainer();
// runSearchBar();
// runBtnBar();