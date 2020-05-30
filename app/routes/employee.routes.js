module.exports = app => {
  const employees = require("../controllers/employee.controller.js");

  // Get all
  app.get("/employees", employees.findAll);
  // Create
  app.post("/employees", employees.create);
  // Get by id
  app.get("/employees/:employeeId", employees.findOne);
  // Update
  app.put("/employees/:employeeId", employees.update);
  // Delete
  app.delete("/employees/:employeeId", employees.delete);
};
