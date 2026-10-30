const mongoose = require("mongoose");

const submenuSchema = new mongoose.Schema({
  p_id: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  submenuname: { type: String },
  parentMenuName: { type: String },
  menulink: {
    type: mongoose.Schema.Types.ObjectId,
  },
  publish: { type: String },
  subUrlLink: { type: String },
});

const SubmenuModel = mongoose.model("Submenu", submenuSchema);

module.exports = SubmenuModel;
