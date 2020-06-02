const LOG = require("../models/log.model.js");

//Create
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        res.status(400).send({
        message: "Content must not be empty"
        });
    }

    const log = new LOG({
        id_c_e: req.body.id_c_e,
        txt: req.body.txt
    });

    LOG.create(log, (err, data) => {
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
    LOG.getAll((err, data) => {
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
    LOG.findById(req.params.logId, (err, data) => {
        if(err) {
            if(err.kind == "not_found") {
                res.status(404).send({
                    message: "Log not found by id " + req.params.logId
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
    LOG.updateById(req.params.logId, new LOG(req.body), (err, data) => {
      if(err) {
        if(err.kind == "not_found") {
            res.status(404).send({
                message: "Log not found by id " + req.params.logId
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
    LOG.remove(req.params.logId, (err, data) => {
        if(err) {
            if(err.kind=="not_found") {
                res.status(404).send({
                    message: 'Can not delete log by id ' + req.params.logId
                });
            }
        else {
            res.status(500).send({
                message : "Internal Server Error DELETE"
            });
        }
      }
      else res.send({message: "Deleted log"});
    });
};

// Delete by relation id
exports.deleteByRelationId = (req, res) => {
  LOG.removeByRelationId(req.params.relationId, (err, data) => {
      if(err) {
          if(err.kind=="not_found") {
              res.status(404).send({
                  message: 'Can not delete log by relation id ' + req.params.relationId
              });
          }
      else {
          res.status(500).send({
              message : "Internal Server Error DELETE"
          });
      }
    }
    else res.send({message: "Deleted log"});
  });
};
