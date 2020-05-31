const SQL = require("./db.js");

// Constructor
const ADMIN = function(admin) {
  this.fname = admin.fname;
  this.lname = admin.lname;
  this.email = admin.email;
  this.status = admin.status;
  this.password = admin.password;
};

// Get all
ADMIN.getAll = (result) => {
  SQL.query("SELECT * FROM admin", (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    console.log("Obtained admins");
    result(null, res);
  });
};

// Create
ADMIN.create = (newAdmin, result) => {
  SQL.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("Admin created", { id: res.insertId, ...newAdmin });
    result(null, { id: res.insertId, ...newAdmin });
  });
};

// Find by id
ADMIN.findById = (adminId, result) => {
  SQL.query(`SELECT * FROM admin WHERE id = ${adminId}`, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res.length) {
      console.log("Found admin", res[0]);
      result(null, res[0]);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

// Update
ADMIN.updateById = (id, admin, result) => {
  SQL.query("UPDATE admin SET fname=?, lname=?, email=?, status=?, password=? WHERE id=?", [admin.fname, admin.lname, admin.email, admin.status, admin.password, id], (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Updated admin: ", { id: id, ...admin });
    result(null, { id: id, ...admin });
  });
};

// Delete
ADMIN.remove = (id, result) => {
  SQL.query("DELETE FROM admin WHERE id=?", id, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(`Deleted admin: ${res.affectedRows}`);
    result(null, res);
  });
};

module.exports = ADMIN;
