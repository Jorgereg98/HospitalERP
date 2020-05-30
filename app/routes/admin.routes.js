module.exports = app => {
  const admins = require("../controllers/admin.controller.js");

  // Get all
  app.get("/admins", admins.findAll);
  // Create
  app.post("/admins", customers.create);
  // Get by id
  app.get("/admins/:adminId", customers.findOne);
  // Update
  app.put("/admins/:adminId", customers.update);
  // Delete
  app.delete("/admins/:adminId", customers.delete);
};
