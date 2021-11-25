import { runLeftBar } from "./leftBar/leftBar.js";
import { runFileContainer, getSelected } from "./fileContainer/fileContainer.js";
import { runButton } from "./searchBar/btnBack.js"
import { runSearchBar } from "./searchBar/searchBar.js"
import { runBtnBar } from "./btnBar/btnBar.js"

document.getElementById("togle-loading-screen").classList.add("invisible");

runButton();
runLeftBar();
runFileContainer();
runSearchBar();
runBtnBar();