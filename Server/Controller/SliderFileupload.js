const MediaModel = require('../Model/SliderFileupload')


const handlePost = ( async (req, res,next) => {

  
    try {
      const formData = new MediaModel({
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
      const formData = await MediaModel.find();
      res.status(200).json(formData);
    } catch (error) {
      console.error(error);
     next(error)
    }
  }
  module.exports={handlePost,handleGetImgtoPopup}