import { getURL, setURL, addFolder, setBackURL } from "../URLhandler.js";
import { openLeftBarFolder, resetLeftBar } from "../leftBar/leftBar.js";
import { fillFileContainer } from "../fileContainer/fileContainer.js";
const bar = document.getElementById("search-bar");

export function runSearchBar() {
    fillSearchBar();

    bar.addEventListener("keypress", e => {
        if (e.key == "Enter") {
            document.getElementById("togle-loading-screen").classList.remove("invisible");
            let URL = bar.value.replace("Root:/", "")
            let urlList = URL.split("/");
            let dirAc = "";
            let acumulator = 0;
            resetLeftBar();


            (function() {

                // monitor the page for changes and reapply if necessary
                // use 'observer.disconnect()' in 'fnCheckChanges()' to stop monitoring

                var alvo = document.getElementById('left-bar-container');
                var observer = new MutationObserver(fnCheckChanges);
                observer.observe(alvo, { attributes: true, characterData: true, childList: true, subtree: true });

            })();

            function fnCheckChanges(changes, observer) {

                if (acumulator > 0) {
                    dirAc += '/';
                }
                dirAc += urlList[acumulator]
                acumulator++
                openLeftBarFolder(dirAc);

                if (acumulator == urlList.length) {
                    observer.disconnect();
                    setTimeout(() => {
                        document.getElementById("togle-loading-screen").classList.add("invisible");
                    }, 1000);
                    // console.log('observer disconected');
                }

            }


        }
    })
}

export function fillSearchBar(URL = "Root:/") {

    bar.value = URL == "Root:/" ? URL : `Root:/${URL}`
}