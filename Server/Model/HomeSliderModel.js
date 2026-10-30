const mongoose = require('mongoose')


//ad slide
const homesliderSchema = new mongoose.Schema({
    file: String,
  });
  const HomesliderModel = mongoose.model("homesliderdata", homesliderSchema);

  module.exports = HomesliderModel