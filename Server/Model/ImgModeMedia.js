const mongoose= require('mongoose')
// Image Schema
const imageSchema = new mongoose.Schema({
    filename: String,
  });
  
  const Image = mongoose.model('Image', imageSchema)


const userSchema = new mongoose.Schema({
    addedImages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = Image
  module.exports = User