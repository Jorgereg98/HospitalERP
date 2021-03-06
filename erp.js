var express = require("express");
var bodyParser = require("body-parser");

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Dirección base
app.get('/', (req, res) =>{
    res.json({message: "Connected"})
});

// Rutas
require("./app/routes/admin.routes.js")(app)
require("./app/routes/client.routes.js")(app)
require("./app/routes/employee.routes.js")(app)
require("./app/routes/log.routes.js")(app)
require("./app/routes/c_e.routes.js")(app)

var PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Servicio funcionando");
});
