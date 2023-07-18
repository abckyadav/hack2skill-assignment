const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  team_name: { type: String, required: true },
});

module.exports = mongoose.model("Team", teamSchema);
