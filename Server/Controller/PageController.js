const PageModel  = require('../Model/Pagemodel')

const handlePost= async (req, res,next) => {
    try {
      const existingUser = await PageModel.findOne({ name: req.body.name });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this name already exists" });
      }
      const formData = new PageModel({
        name: req.body.name,
        slug: req.body.slug,
        metatitle: req.body.metatitle,
        metades: req.body.metades,
        published: req.body.published,
        frontpage: req.body.frontpage,
        editorContent: req.body.editorContent,
        selected: req.body.selected,
        url: req.body.url,
      });
      console.log(formData);
      await formData.save();
      res.status(201).json(formData);
    } catch (error) {
      console.error(error);
next(error)


}
  }



  const handleGet =  async (req, res,next) => {
    try {
      const formData = await PageModel.find();
      res.status(200).json(formData);
    } catch (error) {
      console.error(error);
      next(error)
    }
  }


  const handleFrontendDataShow= async (req, res,next) => {
    try {
      const formData = await PageModel.findOne({
        _id: req.params.id,
        // published: 1,
        // frontpage: 1,
      });
      res.status(200).json(formData);
      console.log(formData);
    } catch (error) {
      next(error)
    }
  }


  const handleEdit =  async (req, res) => {
    try {
      const formData = await PageModel.findOne({ _id: req.params.id });
      res.status(200).json(formData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  const handleDelete= async (req, res) => {
    try {
      const deletedFormData = await PageModel.findByIdAndDelete(req.params.id);
      if (!deletedFormData) {
        return res.status(404).json({ error: "Form data not found" });
      }
      res.status(200).json({ message: "Form data deleted successfully" });
    } catch (error) {
      console.error("Error deleting form data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }



  const handleUpdate= async (req, res) => {
    try {
      const updatedFormData = await PageModel.findByIdAndUpdate(
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
  }



  const handleFrontpageCheckboxUpdate=  async (req, res) => {
    try {
      const updatedFormData = await PageModel.findByIdAndUpdate(
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
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


  const handlePublishpageCheckboxUpdate=  async (req, res) => {
    try {
      const updatedFormData = await PageModel.findByIdAndUpdate(
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
  
      res.status(200).json({ message: "Form data updated successfully", updatedFormData });
    } catch (error) {
      console.error("Error updating form data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
module.exports= {handlePost,handleGet,handleFrontendDataShow,handleEdit,handleDelete,handleUpdate,handlePublishpageCheckboxUpdate,handleFrontpageCheckboxUpdate}