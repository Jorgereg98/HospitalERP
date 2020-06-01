const SQL = require("./db");

// Constructor
const EMPLOYEE = function(employee) {
  this.fname = employee.fname;
  this.lname = employee.lname;
  this.email = employee.email;
  this.status = employee.status;
  this.phone = employee.phone;
  this.password = employee.password;
  this.area = employee.area;
};

// Get all
EMPLOYEE.getAll = (result) => {
  SQL.query("SELECT * FROM employee", (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    console.log("Obtained employees");
    result(null, res);
  });
};

// Create
EMPLOYEE.create = (newEmployee, result) => {
  SQL.query("INSERT INTO employee SET ?", newEmployee, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("Employee created", { id: res.insertId, ...newEmployee });
    result(null, { id: res.insertId, ...newEmployee });
  });
};

// Find by id
EMPLOYEE.findById = (employeeId, result) => {
  SQL.query(`SELECT * FROM employee WHERE id = ${employeeId}`, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res.length) {
      console.log("Found employee", res[0]);
      result(null, res[0]);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

// Update
EMPLOYEE.updateById = (id, employee, result) => {
  SQL.query("UPDATE employee SET fname=?, lname=?, email=?, status=?, phone=?, password=?, area=? WHERE id=?", [employee.fname, employee.lname, employee.email, employee.status, employee.phone, employee.password, employee.area, id], (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Updated employee: ", { id: id, ...employee });
    result(null, { id: id, ...employee });
  });
};

// Delete
EMPLOYEE.remove = (id, result) => {
  SQL.query("DELETE FROM employee WHERE id=?", id, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(`Deleted employee: ${res.affectedRows}`);
    result(null, res);
  });
};

// Get client's employees
EMPLOYEE.getEmployeesByClientId = (clientId, result) => {
  SQL.query("SELECT e.id, e.fname, e.lname, e.email, e.status, e.phone, e.password, e.area FROM employee AS e LEFT JOIN c_e ON c_e.id_employee = e.id WHERE c_e.id_client = ?", clientId, (err, res) => {
    if(err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if(res) {
      console.log("Found employees", res);
      result(null, res);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

module.exports = EMPLOYEE;
