const mongoose = require('mongoose')

//add video
const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    publish: String,
  });
  
  const videoModel = mongoose.model("videoData", videoSchema)

  module.exports = videoModel


