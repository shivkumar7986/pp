const mongoose = require('mongoose')
const BlogUPloadScehma = new mongoose.Schema({
    filename: String,
  });
  
  const BlogUploadModel = mongoose.model("BlogUpload", BlogUPloadScehma);

  module.exports = BlogUploadModel;