const MediaUploadModel = require('../Model/Mediauploadmodel')




const handlePost = async (req, res, next) => {
  try {
    const formData = new MediaUploadModel({
      filename: req.file.filename,
    });
    await formData.save();
    console.log(formData);
    res.status(200).send(" data saved successfully!");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const handleGetImgtoPopup = async (req, res, next) => {
  try {
    const formData = await MediaUploadModel.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { handlePost, handleGetImgtoPopup }












