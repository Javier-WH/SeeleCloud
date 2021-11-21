import { runLeftBar } from "./leftBar/leftBar.js";
import { runFileContainer } from "./fileContainer/fileContainer.js";
import { getAllFilesOrdered } from "./fetch/fileHander.js";

getAllFilesOrdered();

runLeftBar();
runFileContainer();