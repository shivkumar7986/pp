
const mongoose = require('mongoose')
const sliderSchema = new mongoose.Schema({
    file: Array,
    title: String,
    publish: Number, 
    editorContent: String,
  });
  
  //add slide
  const sliderModel = mongoose.model("sliderdata", sliderSchema);
  module.exports = sliderModel

