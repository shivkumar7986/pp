const mongoose = require('mongoose')
const path = require('path')

const BlogUploadSchema = new mongoose.Schema({
  file:String,
  filename: String,
  path: String,
  originalname: String,
  mimetype: String,
  size: Number,
  createdAt: { type: Date, default: Date.now }
});
  
  const BlogImgModel = mongoose.model("BlogImg", BlogUploadSchema);

  module.exports = BlogImgModel;