const mongoose= require('mongoose')

const categorySchema = new mongoose.Schema({
    // Define your form fields here
    name: { type: String },
    slug: { type: String },
  });
  
  const CategoryModel = mongoose.model("categorydata", categorySchema);
  module.exports = CategoryModel