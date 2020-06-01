module.exports = app => {
  const ADMINS = require("../controllers/admin.controller.js");

  // Get all
  app.get("/admins", ADMINS.findAll);
  // Create
  app.post("/admins", ADMINS.create);
  // Get by id
  app.get("/admins/:adminId", ADMINS.findOne);
  // Update
  app.put("/admins/:adminId", ADMINS.update);
  // Delete
  app.delete("/admins/:adminId", ADMINS.delete);
  // Login
  app.get("/admins/login/:adminEmail", ADMINS.login);
};
