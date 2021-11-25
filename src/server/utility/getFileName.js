function getfileName(address) {

    let destFileAdrress = address.split("/");
    let file = destFileAdrress[destFileAdrress.length - 1];

    file = file.replace('.docx', '.pdf');
    file = file.replace(".doc", ".pdf");
    file = file.replace(".pptx", ".pdf");
    file = file.replace(".ppt", ".pdf");
    file = file.replace(".xlsx", ".pdf");
    file = file.replace(".xls", ".pdf");

    return file;

}

module.exports = { getfileName }