const sql = require("./db.js");

// Constructor
const Admin = function(admin) {
  this.fname = admin.fname;
  this.lname = admin.lname;
  this.email = admin.email;
  this.status = admin.status;
  this.password = admin.password;
};

// Get all
Admin.getAll = (result) => {
  sql.query("SELECT * FROM admin", (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    console.log("Obtained admins");
    result(null, res);
  });
};

module.exports = Admin;
