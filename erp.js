var express = require("express");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    res.json({message: "Connected"})
})

// require("./app/routes/customer.routes.js")

var PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Servicio funcionando");
})