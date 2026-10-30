const MediaMainPagemodel = require("../Model/MediamainPageModel");
const MediaUploadModel = require("../Model/Mediauploadmodel");
const mongoose = require("mongoose");

// const handleAddImageToMedia = async (req, res, next) => {
//     try {
//       console.log("Request body:", req.body);
//       const newdata = new MediaMainPagemodel({
//         file: req.body.file,
//       });
//       await newdata.save();
//       console.log("DATA added successfully:", newdata);
//       res.status(201).json(newdata);
//     } catch (error) {
//       console.error("Error adding slide:", error);
//       next(error);
//     }
//   };
const handleAddImageToMedia = async (req, res, next) => {
  try {
      const newdata = new MediaMainPagemodel({
          file: req.body.file,
          showInGallery: 2 // Set default value to 2 for publish
      });
      await newdata.save();
      console.log("Data added successfully:", newdata);
      res.status(201).json(newdata);
  } catch (error) {
      console.error("Error adding image:", error);
      next(error);
  }
};

  
  
  const handleGetMediaImages = async (req, res, next) => {
    try {
      const imageData = await MediaMainPagemodel.find();
      let arr = [];
  
      for (let index = 0; index < imageData.length; index++) {
        const MediaMainPageData = imageData[index];
        let element = {};
        element.autoID = MediaMainPageData._id;
        element.file = MediaMainPageData.file;
  
        if (MediaMainPageData.file && MediaMainPageData.file.length > 0) {
          const newID = new mongoose.Types.ObjectId(MediaMainPageData.file[0]);
          const img = await MediaUploadModel.findById(newID);
          if (img) {
            element.filename = img.filename;
          } else {
            element.filename = "";
          }
        } else {
          element.filename = ""; 
        }
        arr.push(element);
      }
      console.log(arr);
      res.status(200).json(arr);
    } catch (error) {
      console.error("Error fetching slides:", error);
      next(error);
    }
  };



  const hadleDelete= async (req, res,next) => {
    try {
      const id = req.params.id;
      const data = await MediaMainPagemodel.findByIdAndDelete(id);
      if (!data) {
        res.status(404).json({ error: "Data not found" });
      } else {
        res.status(200).json({ message: "Data deleted successfully" });
      }
    } catch (error) {
      console.error(error, "Error in deleting the data ");
      next(error)
    }
  }

  // const handleGet = async (req, res) => {
  //   const id = req.params.id;
  //   try {
  //     const formData = await MediaUploadModel.findById(id);
  //     if (!formData) {
  //       console.log(`No data found for ID: ${id}`);
  //       return res.status(404).json({ error: "Image not found" });
  //     }
  //     res.status(200).json(formData);
  //   } catch (error) {
  //     console.error(error);
  //     next(error);
  //   }
  // };

  const handleSubmitCheckBox = async (req, res, next) => {
    try {
      const id = req.params.id;
      const imageData = await MediaMainPagemodel.findById(id);
  
      if (!imageData) {
        return res.status(404).json({ error: "Image not found" });
      }
  
      // Toggle the showInGallery value between 1 and 2
      imageData.showInGallery = imageData.showInGallery === 1 ? 2 : 1;
      await imageData.save();
  
      res.status(200).json({ message: "Publish status updated successfully", showInGallery: imageData.showInGallery });
    } catch (error) {
      console.error("Error toggling publish status:", error);
      next(error);
    }
  };
  
  
module.exports = {
  handleAddImageToMedia,
  handleGetMediaImages,hadleDelete,handleSubmitCheckBox,
};

