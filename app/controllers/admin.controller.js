const ADMIN = require("../models/admin.model.js");

// Get all
exports.findAll = (req, res) => {
  ADMIN.getAll((err, data) => {
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
  if(!req.body) {
    res.status(400).send({
      message: "Content must not be empty"
    });
  }

  const admin = new ADMIN({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    status: req.body.status,
    password: req.body.password
  });

  ADMIN.create(admin, (err, data) => {
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
  ADMIN.findById(req.params.adminId, (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "Admin not found by id " + req.params.adminId
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
  ADMIN.updateById(req.params.adminId, new ADMIN(req.body), (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "Admin not found by id " + req.params.adminId
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
  ADMIN.remove(req.params.adminId, (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "Can not delete customer by id " + req.params.customerId
        });
      }
      else {
        res.status(500).send({
          message : "Internal Server Error DELETE"
        });
      }
    }
    else res.send({message: "Deleted admin"});
  });
};
