const CLIENT = require("../models/client.model.js");

//Create
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        res.status(400).send({
        message: "Content must not be empty"
        });
    }

    const client = new CLIENT({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        status: req.body.status,
        phone: req.body.phone,
        password: req.body.password
    });

    CLIENT.create(client, (err, data) => {
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

//Get all
exports.findAll = (req, res) => {
    CLIENT.getAll((err, data) => {
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

// Get one
exports.findOne = (req, res) => {
    CLIENT.findById(req.params.clientId, (err, data) => {
        if(err) {
            if(err.kind == "not_found") {
                res.status(404).send({
                    message: "Client not found by id " + req.params.clientId
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

// Get one by email
exports.login = (req, res) => {
  CLIENT.findByEmail(req.params.clientEmail, (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "Client not found by email " + req.params.clientEmail
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
    CLIENT.updateById(req.params.clientId, new CLIENT(req.body), (err, data) => {
      if(err) {
        if(err.kind == "not_found") {
            res.status(404).send({
                message: "Client not found by id " + req.params.clientId
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
    CLIENT.remove(req.params.clientId, (err, data) => {
        if(err) {
            if(err.kind=="not_found") {
                res.status(404).send({
                    message: 'Can not delete client by id ' + req.params.clientId
                });
            }
        else {
            res.status(500).send({
                message : "Internal Server Error DELETE"
            });
        }
      }
      else res.send({message: "Deleted client"});
    });
};

// Get employee's clients
exports.getEmployeeClients = (req, res) => {
  CLIENT.getClientsByEmployeeId(req.params.employeeId, (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "Clients not found for employee with id " + req.params.employeeId
        });
      }
      else {
        res.status(500).send({
          message: "Internal Server Error GET_EMPLOYEES_CLIENTS"
        });
      }
    }
    else {
      res.send(data);
    }
  });
};

// Get employee's missing clients
exports.getEmployeeMissingClients = (req, res) => {
  CLIENT.getMissingClientsByEmployeeId(req.params.employeeId, (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "Missing clients not found for employee with id " + req.params.employeeId
        });
      }
      else {
        res.status(500).send({
          message: "Internal Server Error GET_EMPLOYEES_MISSING_CLIENTS"
        });
      }
    }
    else {
      res.send(data);
    }
  });
};

// Search clients by keyword
exports.searchClients = (req, res) => {
  CLIENT.getClientsByKeyword(req.params.keyword, (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "Clients not found by keyword " + req.params.keyword
        });
      }
      else {
        res.status(500).send({
          message: "Internal Server Error SEARCH_CLIENTS"
        });
      }
    }
    else {
      res.send(data);
    }
  });
};
