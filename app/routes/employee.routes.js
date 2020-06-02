module.exports = app => {
  const EMPLOYEES = require("../controllers/employee.controller.js");

  // Get all
  app.get("/employees", EMPLOYEES.findAll);
  // Create
  app.post("/employees", EMPLOYEES.create);
  // Get by id
  app.get("/employees/:employeeId", EMPLOYEES.findOne);
  // Update
  app.put("/employees/:employeeId", EMPLOYEES.update);
  // Delete
  app.delete("/employees/:employeeId", EMPLOYEES.delete);
  // Get client's employees
  app.get("/clients/:clientId/employees", EMPLOYEES.getClientEmployees);
  // Login
  app.get("/employees/login/:employeeEmail", EMPLOYEES.login);
  // Search employees
  app.get("/search/employees/:keyword", EMPLOYEES.searchEmployees);
};
