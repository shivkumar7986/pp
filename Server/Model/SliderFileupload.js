const mongoose = require('mongoose')
const mediaSchema = new mongoose.Schema({
    filename: String,
  });
  
  const FileuploadModel = mongoose.model("mediaaData", mediaSchema);

  module.exports = FileuploadModel;