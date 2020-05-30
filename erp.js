var express = require("express");
var bodyParser = require("body-parser");

// const mysql = require("mysql");
// const dbConfig = require("./app/config/db.config.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Dirección base
app.get('/', (req, res) =>{
    res.json({message: "Connected"})
});

// Rutas
require("./app/routes/admin.routes.js")(app)

var PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Servicio funcionando");
});
