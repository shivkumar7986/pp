const mongoose = require('mongoose')
const settingDataSchema = new mongoose.Schema({
    title: String,
    description: String,
    keyword: String,
  });
  
  const settingModel = mongoose.model("settingData", settingDataSchema);
module.exports=  settingModel
