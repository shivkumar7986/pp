const  mongoose  = require("mongoose");

const pageSchema =new  mongoose.Schema({
     // Define your form fields here
  name: { type: String },
  slug: { type: String },
  metatitle: { type: String },
  metades: { type: String },
  published: { type: Number },
  frontpage: { type: Number },
  editorContent: { type: String },
  selected: { type: Array },
  url: String,
  htmlContent: String,
})

const PageModel = mongoose.model("PageData", pageSchema);
module.exports=  PageModel