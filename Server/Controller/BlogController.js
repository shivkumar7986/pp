const BlogModel = require("../Model/BlogModel");
const BlogImgModel = require('../Model/BlogUploadImgModel')

const handlePost= async (req, res,next) => {
  try {
    const existingUser = await BlogModel.findOne({ name: req.body.name });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this name already exists" });
    }
    const formData = new BlogModel({
      name: req.body.name,
      slug: req.body.slug,
      metatitle: req.body.metatitle,
      metades: req.body.metades,
      published: req.body.published,
      frontpage: req.body.frontpage,
      editorContent: req.body.editorContent,
      category: req.body.category,
      date: req.body.date,
      selectedImage:req.body.selectedImage,
      selected:req.body.selected,
      file: req.body.file,

    });
    console.log("blog"+formData);
    await formData.save();
    res.status(201).json(formData);
  } catch (error) {
    console.error(error);
    next(error)
    // res.status(500).send("Internal Server Error");
  }
}
const handleGet = async (req, res) => {
  try {
    const formData = await BlogModel.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleDelete = async (req, res) => {
  try {
    const deletedFormData = await BlogModel.findByIdAndDelete(req.params.id);
    if (!deletedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }
    res.status(200).json({ message: "Form data deleted successfully" });
  } catch (error) {
    console.error("Error deleting form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const handleEdit = async (req, res) => {
  try {
    const formData = await BlogModel.findOne({ _id: req.params.id });
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const handleUpdate = async (req, res) => {
  try {
    const updatedFormData = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          slug: req.body.slug,
          metatitle: req.body.metatitle,
          metades: req.body.metades,
          published: req.body.published,
          frontpage: req.body.frontpage,
          editorContent: req.body.editorContent,
          selected: req.body.selected,
          url: req.body.url,
          date: req.body.date,
          category: req.body.category,
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleFrontendBlogData = async (req, res) => {
  try {
    const formData = await BlogModel.findOne({
      _id: req.params.id,
      published: 1,
      frontpage: 1,
    });
    res.status(200).json(formData);
    console.log(formData);
  } catch (error) {
    console.error(error);
    next(error)  }
};
const handleUpdateCheckbox = async (req, res) => {
  try {
    const updatedFormData = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          frontpage: req.params.frontpage,
          // Update other fields as needed
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    next(error)  }
};

const handleUpdateCheckbox2 = async (req, res) => {
  try {
    const updatedFormData = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          published: req.params.published,
          // Update other fields as needed
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    next(error)  }
};

module.exports = {
  handlePost,
  handleGet,
  handleDelete,
  handleEdit,
  handleUpdate,
  handleFrontendBlogData,
  handleUpdateCheckbox,
  handleUpdateCheckbox2,
};
