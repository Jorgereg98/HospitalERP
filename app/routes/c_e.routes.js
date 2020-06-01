module.exports = app => {
  const C_E = require("../controllers/c_e.controller.js");

  // Get all
  app.get("/c_e", C_E.findAll);
  // Create
  app.post("/c_e", C_E.create);
  // Get by id
  app.get("/c_e/:c_eId", C_E.findOne);
  // Update
  app.put("/c_e/:c_eId", C_E.update);
  // Delete
  app.delete("/c_e/:c_eId", C_E.delete);
  // Delete by ids
  app.delete("/c_e/:employeeId/:clientId", C_E.deleteByIds);
};
