
const mongoose = require('mongoose')
const MediaMainSchema = new mongoose.Schema({
    file: Array,
    showInGallery:{ type: Number, default: 2 }, // Default publish value set to 2
  });
  
  //add slide
  const MediaMainModel = mongoose.model("MediaMainDatas", MediaMainSchema);
  module.exports = MediaMainModel
