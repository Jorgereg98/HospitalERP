const SQL = require("./db.js");

//Constructor
const LOG = function(log) {
    this.id_c_e = log.id_c_e;
    this.txt = log.txt;
}

//Create
LOG.create = (newLog, result) => {
    SQL.query("INSERT INTO log_c_e SET ?", newLog, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Log created", { id: res.insertId, ...newLog });
        result(null, { id: res.insertId, ...newLog });
    });
};

//Get all
LOG.getAll = (result) => {
    SQL.query("SELECT * FROM log_c_e", (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Obtained logs");
        result(null, res);
    });
};

// Find by id
LOG.findById = (logId, result) => {
    SQL.query(`SELECT * FROM log_c_e WHERE id = ${logId}`, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if(res.length) {
            console.log("Found log", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);
    });
};

// Update
LOG.updateById = (id, log, result) => {
    SQL.query("UPDATE log_c_e SET id_c_e=?, txt=? WHERE id=?", [log.id_c_e, log.txt, id], (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Updated log: ", { id: id, ...log });
        result(null, { id: id, ...log });
    });
};

// Delete
LOG.remove = (id, result) => {
    SQL.query("DELETE FROM log_c_e WHERE id=?", id, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) {
            result({ kind: "notFound" }, null);
            return;
        }
        console.log(`Deleted log: ${res.affectedRows}`);
        result(null, res);
    });
};

// Delete by relation id
LOG.removeByRelationId = (relationId, result) => {
  SQL.query("DELETE FROM log_c_e WHERE id_c_e=?", relationId, (err, res) => {
      if(err) {
          console.log("Error: ", err);
          result(err, null);
          return;
      }
      if(res.affectedRows == 0) {
          result({ kind: "notFound" }, null);
          return;
      }
      console.log(`Deleted log: ${res.affectedRows}`);
      result(null, res);
  });
};

module.exports = LOG;
