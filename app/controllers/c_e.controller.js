const C_E = require("../models/c_e.model.js");

// Get all
exports.findAll = (req, res) => {
  C_E.getAll((err, data) => {
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

  const c_e = new C_E({
    id_employee: req.body.id_employee,
    id_client: req.body.id_client,
    name: req.body.name,
    status: req.body.status
  });

  C_E.create(c_e, (err, data) => {
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
  C_E.findById(req.params.c_eId, (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "C_e not found by id " + req.params.c_eId
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
  C_E.updateById(req.params.c_eId, new C_E(req.body), (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "C_e not found by id " + req.params.c_eId
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
  C_E.remove(req.params.c_eId, (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(404).send({
          message: "Can not delete c_e by id " + req.params.c_eId
        });
      }
      else {
        res.status(500).send({
          message : "Internal Server Error DELETE"
        });
      }
    }
    else res.send({message: "Deleted c_e"});
  });
};
