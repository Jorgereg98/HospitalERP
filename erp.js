var express = require("express");
var bodyParser = require("body-parser");

const app = express();

app.get('/', (req, res) =>{
    res.json({message: "Connected"})
})
var PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Servicio funcionando");
})