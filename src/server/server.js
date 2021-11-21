//modulos
const path = require('path');
const os = require('os');
const colors = require('colors')
const express = require('express');
const dotenv = require('dotenv');




/////

//configuracion
dotenv.config({ path: path.join(__dirname, "./env/.env") });


//server
const app = express();

//public Path
app.use(express.static(path.join(__dirname, "../public")));

//rutas y midlewares
app.use(require(path.join(__dirname, "routes/get.js"))); //get
app.use(require(path.join(__dirname, "routes/post.js"))); //post



////server listener
const port = process.env.PORT;
const IP = process.env.IP;
app.listen(port, IP, error => {
    console.clear();
    if (error) {
        console.log(`Error al inicial el servidor codigo -> ${error.code}`);
    } else {
        console.log(`El servidor se ha iniciado en la direccion -> ${os.networkInterfaces().Ethernet[1].address}:${port}`.green);
    }
});