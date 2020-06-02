const SQL = require("./db.js");

// Constructor
const C_E = function(c_e) {
  this.id_employee = c_e.id_employee;
  this.id_client = c_e.id_client;
  this.name = c_e.name;
  this.status = c_e.status;
};

// Get all
C_E.getAll = (result) => {
  SQL.query("SELECT * FROM c_e", (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    console.log("Obtained relations");
    result(null, res);
  });
};

// Create
C_E.create = (newC_e, result) => {
  SQL.query("INSERT INTO c_e SET ?", newC_e, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("C_e created", { id: res.insertId, ...newC_e });
    result(null, { id: res.insertId, ...newC_e });
  });
};

// Find by id
C_E.findById = (c_eId, result) => {
  SQL.query(`SELECT * FROM c_e WHERE id = ${c_eId}`, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res.length) {
      console.log("Found c_e", res[0]);
      result(null, res[0]);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

// Update
C_E.updateById = (id, c_e, result) => {
  SQL.query("UPDATE c_e SET id_employee=?, id_client=?, name=?, status=? WHERE id=?", [c_e.id_employee, c_e.id_client, c_e.name, c_e.status, id], (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Updated c_e: ", { id: id, ...c_e });
    result(null, { id: id, ...c_e });
  });
};

// Delete
C_E.remove = (id, result) => {
  SQL.query("DELETE FROM c_e WHERE id=?", id, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(`Deleted c_e: ${res.affectedRows}`);
    result(null, res);
  });
};

// Delete by cliend id and employee id
C_E.removeByIds = (idEmployee, idClient, result) => {
  SQL.query("DELETE FROM c_e WHERE id_employee=? AND id_client=?", [idEmployee, idClient], (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      result;
    }
    if(res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(`Deleted c_e: ${res.affectedRows}`);
    result(null, res);
  });
};

// Get relation by client id and employee id
C_E.getByIds = (employeeId, clientId, result) => {
  SQL.query("SELECT * FROM c_e WHERE id_employee=? AND id_client=?", [employeeId, clientId], (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res.length) {
      console.log("Found c_e", res[0]);
      result(null, res[0]);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

module.exports = C_E;
