const mongoose = require('mongoose')

//mange album
const manageAlbumSchema = new mongoose.Schema({
    name: String,
    editorContent: String,
  });
  
  const manageAlbumModel = mongoose.model("manageAlbum", manageAlbumSchema);
  module.exports = manageAlbumModel
