
const mongoose = require('mongoose')

const mediaSchema2 = new mongoose.Schema({
    file: String,
  })
  
  const MediaModel2 = mongoose.model("mediaData2", mediaSchema2);

  module.exports = MediaModel2;