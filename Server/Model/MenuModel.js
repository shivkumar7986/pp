const mongoose = require('mongoose')



const menuSchema = new mongoose.Schema({
    name: { type: String },
    menutype: { type: String },
    menulink: mongoose.Schema.Types.Mixed,
    publish: { type: String },
    urlLink:{type:String}
  });
  
  const MenuModel = mongoose.model("MenuData", menuSchema);
  module.exports= MenuModel