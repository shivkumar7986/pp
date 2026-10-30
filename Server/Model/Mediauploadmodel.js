const mongoose = require('mongoose')
const mediaSchema = new mongoose.Schema({
    filename: String,
  });
  
  const MediaUploadModel = mongoose.model("MediaUploadData", mediaSchema);

  module.exports = MediaUploadModel;