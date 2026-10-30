const mongoose = require('mongoose')

  const videoGallerysettingDataSchema = new mongoose.Schema({
    title: String,
    description: String,
    keyword: String,
    publish: String,
    select: String,
    videoperPage: String,
  });
  
  const videoGallerysettingModel = mongoose.model(
    "videoGallerysettingData",
    videoGallerysettingDataSchema
  );
  module.exports = videoGallerysettingModel