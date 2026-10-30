const CategoryModel = require('../Model/CategoryModel')



const handlePost=  async (req, res) => {
    try {
      const existingUser = await CategoryModel.findOne({ name: req.body.name });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this name already exists" });
      }
      const formData = new CategoryModel({
        name: req.body.name,
        slug: req.body.slug,
      });
      console.log(formData);
      await formData.save();
      res.status(201).json(formData);
    } catch (error) {
      console.error(error);
      next(error)

  }
}
const handleGet= async (req, res) => {
    try {
      const formData = await CategoryModel.find();
      res.status(200).json(formData);
    } catch (error) {
      console.error(error);
      next(error)

    }
  }
const handleEdit= async (req, res) => {
    try {
      const formData = await CategoryModel.findOne({ _id: req.params.id });
      res.status(200).json(formData);
    } catch (error) {
      console.error(error);
      next(error)

    }
  }
const handleUpdate= async (req, res) => {
    try {
      const updatedFormData = await CategoryModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
            slug: req.body.slug,
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
      next(error)

    }
  }
const handleDelete= async (req, res) => {
    try {
      const deletedFormData = await CategoryModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedFormData) {
        return res.status(404).json({ error: "Form data not found" });
      }
      res.status(200).json({ message: "Form data deleted successfully" });
    } catch (error) {
      console.error("Error deleting form data:", error);
      next(error)

    }
  }

 


module.exports = {
    handlePost,
    handleGet,
    handleDelete,
    handleEdit,
    handleUpdate,
  }