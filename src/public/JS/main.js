import { runLeftBar } from "./leftBar/leftBar.js";
import { runFileContainer } from "./fileContainer/fileContainer.js";
import { runButton } from "./searchBar/btnBack.js"
import { runSearchBar } from "./searchBar/searchBar.js"

document.getElementById("togle-loading-screen").classList.add("invisible");

runButton();
runLeftBar();
runFileContainer();
runSearchBar();