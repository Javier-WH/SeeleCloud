export async function getAllFiles(URL = "ROOT", callback) {
    let ask = await fetch(`/getFiles?url=${URL}`);
    let response = await ask.json();
    if (response.ERROR) {
        console.error(response.ERROR);
    } else {
        callback(response);
    }
}

export async function getFolders(URL, callback) {
    await getAllFiles(URL, files => {
        let folderList = files.filter(file => {
            return file.type == "folder";
        })
        callback(folderList);
    })
}

export async function getFiles(URL, callback) {
    await getAllFiles(URL, files => {
        let fileList = files.filter(file => {
            return file.type != "folder";
        })
        callback(fileList);
    })
}


export function getAllFilesOrdered(URL, callback) {
    let folderList = [];
    let fileList = [];
    getFolders(URL, folders => {
        folderList = folders.sort((a, b) => {
            return a.name - b.name;
        });
        getFiles(URL, files => {
            fileList = files.sort((a, b) => {
                return a.name - b.name;
            });
            try {
                callback(folderList.concat(fileList));

            } catch (error) {

            }

        })
    })
}

export async function getFile(URL = "ROOT", callback) {

    if (URL != "ROOT") {
        let ask = await fetch(`/downloadFile?url=${URL}`);
        let response = await ask.blob();
        callback(response);
    }
}

export async function getFolder(URL = "ROOT", callback) {

    if (URL != "ROOT") {
        let ask = await fetch(`/downloadFolder?url=${URL}`);
        let response = await ask.blob();
        callback(response);
    }
}
//////////////////////////////////////////