const EMPLOYEE = require("../models/employee.model.js");

// Get all
exports.findAll = (req, res) => {
  EMPLOYEE.getAll((err, data) => {
    if(err) {
      res.status(500).send({
        message: err.message || "Internal Server Error FIND_ALL"
      });
    }
    else {
      res.send(data);
    }
  });
};

// Create
exports.create = (req, res) => {
  // Validate request
  if(!req.body) {
    res.status(400).send({
      message: "Content must not be empty"
    });
  }

  const employee = new EMPLOYEE({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    status: req.body.status,
    phone: req.body.phone,
    password: req.body.password,
    area: req.body.area
  });

  EMPLOYEE.create(employee, (err, data) => {
    if(err) {
      res.status(500).send({
        message: err.message || "Internal Server Error CREATE"
      });
    }
    else {
      res.send(data);
    }
  });
};

// Get one
exports.findOne = (req, res) => {
  EMPLOYEE.findById(req.params.employeeId, (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "Employee not found by id " + req.params.employeeId
        });
      }
      else {
        res.status(500).send({
          message: "Internal Server Error FIND_ONE"
        });
      }
    }
    else {
      res.send(data);
    }
  });
};

// Update
exports.update = (req, res) => {
  // Validate request
  if(!req.body) {
    res.status(400).send({
      message: "Content must not be empty"
    });
  }
  console.log(req.body);

  // Update by id
  EMPLOYEE.updateById(req.params.employeeId, new EMPLOYEE(req.body), (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "Employee not found by id " + req.params.employeeId
        });
      }
      else {
        res.status(500).send({
          message: "Internal Server Error UPDATE"
        });
      }
    }
    else {
      res.send(data);
    }
  });
};

// Delete
exports.delete = (req, res) => {
  EMPLOYEE.remove(req.params.employeeId, (err, data) => {
    if(err) {
      if(err.kind=="not_found") {
        res.status(404).send({
          message: 'Can not delete employee by id ' + req.params.employeeId
        });
      }
      else {
        res.status(500).send({
          message : "Internal Server Error DELETE"
        });
      }
    }
    else res.send({message: "Deleted employee"});
  });
};

// Get client's employees
exports.getClientEmployees = (req, res) => {
  EMPLOYEE.getEmployeesByClientId(req.params.clientId, (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "Employees not found for client with id " + req.params.clientId
        });
      }
      else {
        res.status(500).send({
          message: "Internal Server Error GET_CLIENT_EMPLOYEES"
        });
      }
    }
    else {
      res.send(data);
    }
  });
};
