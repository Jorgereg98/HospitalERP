const SQL = require("./db.js");

//Constructor
const CLIENT = function(client) {
    this.fname = client.fname;
    this.lname = client.lname;
    this.email = client.email;
    this.status = client.status;
    this.phone = client.phone;
    this.password = client.password;
}

//Create
CLIENT.create = (newClient, result) => {
    SQL.query("INSERT INTO client SET ?", newClient, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Client created", { id: res.insertId, ...newClient });
        result(null, { id: res.insertId, ...newClient });
    });
};

//Get all
CLIENT.getAll = (result) => {
    SQL.query("SELECT * FROM client", (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Obtained clients");
        result(null, res);
    });
};

// Find by id
CLIENT.findById = (clientId, result) => {
    SQL.query(`SELECT * FROM client WHERE id = ${clientId}`, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if(res.length) {
            console.log("Found client", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);
    });
};

// Update
CLIENT.updateById = (id, client, result) => {
    SQL.query("UPDATE client SET fname=?, lname=?, email=?, status=?, phone=?, password=? WHERE id=?", [client.fname, client.lname, client.email, client.status, client.phone, client.password, id], (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Updated client: ", { id: id, ...client });
        result(null, { id: id, ...client });
    });
};

// Delete
CLIENT.remove = (id, result) => {
    SQL.query("DELETE FROM client WHERE id=?", id, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) {
            result({ kind: "notFound" }, null);
            return;
        }
        console.log(`Deleted client: ${res.affectedRows}`);
        result(null, res);
    });
};

module.exports = CLIENT;
