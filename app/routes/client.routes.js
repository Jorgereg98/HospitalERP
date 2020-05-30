module.exports = app => {
  const clients = require("../controllers/client.controller.js");

  // Get all
  app.get("/clients", clients.findAll);
  // Create
  app.post("/clients", clients.create);
  // Get by id
  app.get("/clients/:clientId", clients.findOne);
  // Update
  app.put("/clients/:clientId", clients.update);
  // Delete
  app.delete("/clients/:clientId", clients.delete);
};
