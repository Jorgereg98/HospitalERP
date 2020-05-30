module.exports = app => {
  const admins = require("../controllers/admin.controller.js");

  // Get all
  app.get("/admins", admins.findAll);
};
