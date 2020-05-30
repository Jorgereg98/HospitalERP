module.exports = app => {
  const CLIENTS = require("../controllers/client.controller.js");

  // Get all
  app.get("/clients", CLIENTS.findAll);
  // Create
  app.post("/clients", CLIENTS.create);
  // Get by id
  app.get("/clients/:clientId", CLIENTS.findOne);
  // Update
  app.put("/clients/:clientId", CLIENTS.update);
  // Delete
  app.delete("/clients/:clientId", CLIENTS.delete);
};
