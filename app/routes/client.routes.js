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
  // Get employee's clients
  app.get("/employees/:employeeId/clients", CLIENTS.getEmployeeClients);
  // Login
  app.get("/clients/login/:clientEmail", CLIENTS.login);
  // Get missing clients for employee
  app.get("/employees/:employeeId/clients/missing", CLIENTS.getEmployeeMissingClients);
  // Search clients
  app.get("/search/clients/:keyword", CLIENTS.searchClients);
};
