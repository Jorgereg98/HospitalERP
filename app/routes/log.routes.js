module.exports = app => {
  const logs = require("../controllers/log.controller.js");

  // Get all
  app.get("/logs", logs.findAll);
  // Create
  app.post("/logs", logs.create);
  // Get by id
  app.get("/logs/:logId", logs.findOne);
  // Update
  app.put("/logs/:logId", logs.update);
  // Delete
  app.delete("/logs/:logId", logs.delete);
};
