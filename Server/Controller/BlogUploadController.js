const BlogUploadModel = require('../Model/BlogUploadModel')


const handlePost = ( async (req, res,next) => {

  
    try {
      const formData = new BlogUploadModel({
        filename: req.file.filename,
      });
      await formData.save();
      console.log(formData)
      res.status(200).send("Form data saved successfully!");
    } catch (error) {
      console.error(error);
     next(error)
    }
  })


  const handleGetImgtoPopup = async (req, res) => {
    try {
      const formData = await BlogUploadModel.find();
      res.status(200).json(formData);
    } catch (error) {
      console.error(error);
     next(error)
    }
  }
  module.exports={handlePost,handleGetImgtoPopup}