

const mongoose= require('mongoose')

const blogSchema = new mongoose.Schema({



    // Define your form fields here
    name: { type: String },
    slug: { type: String },
    metatitle: { type: String },
    metades: { type: String },
    published: { type: Number },
    frontpage: { type: Number },
    editorContent: { type: String },
    htmlContent: String,
    date: Date,
    category: String,
    selected: Array, // Assuming selected image information is stored as an object
    selectedImage:Object,
    file:Array
  });
  
  const BlogModel = mongoose.model("blogdata", blogSchema);

  module.exports = BlogModel
