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

// Find by email
CLIENT.findByEmail = (clientEmail, result) => {
  SQL.query(`SELECT * FROM client WHERE email = '${clientEmail}'`, (err, res) => {
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

// Get employee's clients
CLIENT.getClientsByEmployeeId = (employeeId, result) => {
  SQL.query("SELECT c.id, c.fname, c.lname, c.email, c.status, c.phone, c.password FROM client AS c LEFT JOIN c_e ON c_e.id_client = c.id WHERE c_e.id_employee = ?", employeeId, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res) {
      console.log("Found clients: ", res);
      result(null, res);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

// Get employee's missing clients
CLIENT.getMissingClientsByEmployeeId = (employeeId, result) => {
  SQL.query("SELECT * FROM client WHERE NOT id IN (SELECT id_client FROM c_e WHERE id_employee = ?)", employeeId, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res) {
      console.log("Found clients: ", res);
      result(null, res);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

// Search clients by keyword
CLIENT.getClientsByKeyword = (keyword, result) => {
  SQL.query(`SELECT * FROM client WHERE fname LIKE '%${keyword}%' OR lname LIKE '%${keyword}%' OR email LIKE '%${keyword}%' OR phone LIKE '%${keyword}%'`, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res) {
      console.log("Found clients: ", res);
      result(null, res);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

module.exports = CLIENT;
