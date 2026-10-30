

const mongoose = require('mongoose')


const GroupMenu = new mongoose.Schema({
    groupName: String,
    publish: String,
  });
  
  const MenuGroupModel = mongoose.model("MenuGroupData", GroupMenu);
  module.exports = MenuGroupModel;