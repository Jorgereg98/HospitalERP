const admin = require("../models/admin.model.js");

// Get all
exports.findAll = (req, res) => {
  admin.getAll((err, data) => {
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
