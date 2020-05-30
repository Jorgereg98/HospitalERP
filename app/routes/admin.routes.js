module.exports = app => {
  const admins = require("../controllers/admin.controller.js");

  // Get all
  app.get("/admins", admins.findAll);
  // Create
  app.post("/admins", admins.create);
  // Get by id
  app.get("/admins/:adminId", admins.findOne);
  // Update
  app.put("/admins/:adminId", admins.update);
  // Delete
  app.delete("/admins/:adminId", admins.delete);
};
