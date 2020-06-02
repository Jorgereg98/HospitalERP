module.exports = app => {
  const LOGS = require("../controllers/log.controller.js");

  // Get all
  app.get("/logs", LOGS.findAll);
  // Create
  app.post("/logs", LOGS.create);
  // Get by id
  app.get("/logs/:logId", LOGS.findOne);
  // Update
  app.put("/logs/:logId", LOGS.update);
  // Delete
  app.delete("/logs/:logId", LOGS.delete);
  // Delete by relation id
  app.delete("/logs/relations/:relationId", LOGS.deleteByRelationId);
};
