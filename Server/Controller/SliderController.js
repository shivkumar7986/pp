const express = require("express");
const multer = require("multer");
const sliderModel = require("../Model/SliderModel");
const MediaModel2 = require("../Model/MediaModel2");
const { json } = require("body-parser");
const mongoose = require("mongoose");
const MediaModel = require("../Model/SliderFileupload");

const ObjectId = mongoose.Types.ObjectId;
// Add new slide
const handlePost = async (req, res, next) => {
  // console.log('Received POST request to add slide');
  try {
    console.log("Request body:", req.body);

    const newSlide = new sliderModel({
      title: req.body.title,
      publish: req.body.publish,
      editorContent: req.body.editorContent,
      file: req.body.file,
    });
    await newSlide.save();
    console.log("Slide added successfully:", newSlide);
    res.status(201).json(newSlide);
  } catch (error) {
    console.error("Error adding slide:", error);
    next(error);
  }
};
const handleGetwithoutImage= async (req, res,next) => {
  try {
    const formData = await sliderModel.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
   next(error)
  }
}

// const handleGet = async (req, res, next) => {
//   try {
//     // Fetch image data from your database
//     const imageData = await sliderModel.find();
//     let arr = [];

//     for (let index = 0; index < imageData.length; index++) {
//       const sliderModelData = imageData[index];

//       let element = {};
//       element.autoID = sliderModelData._id;
//       element.title = sliderModelData.title;
//       element.publish = sliderModelData.publish;
//       element.editorContent = sliderModelData.editorContent;
//       element.file = sliderModelData.file;

//       if (sliderModelData.file && sliderModelData.file.length > 0) {
//         const newID = new mongoose.Types.ObjectId(sliderModelData.file[0]);
//         const img = await MediaModel.findById(newID);
//         if (img) {
//           element.filename = img.filename;
//         }
//       }
//       arr.push(element);
//     }
//     console.log(arr);

//     // if (!arr) {
//     //   return res.status(404).json({ error: "Images not found" });
//     // }

//     // Send the image data back to the client
//     res.status(200).json(arr);
//   } catch (error) {
//     console.error("Error fetching slides:", error);
//     next(error);
//   }
// };
// Fetch all slides
const handleGet = async (req, res, next) => {
  try {
    const imageData = await sliderModel.find();
    let arr = [];

    for (let index = 0; index < imageData.length; index++) {
      const sliderModelData = imageData[index];

      let element = {};
      element.autoID = sliderModelData._id;
      element.title = sliderModelData.title;
      element.publish = sliderModelData.publish;
      element.editorContent = sliderModelData.editorContent;
      element.file = sliderModelData.file;

      if (sliderModelData.file && sliderModelData.file.length > 0) {
        const newID = new mongoose.Types.ObjectId(sliderModelData.file[0]);
        const img = await MediaModel.findById(newID);
        if (img) {
          element.filename = img.filename;
        } else {
          element.filename = ""; // or some default value
        }
      } else {
        element.filename = ""; // or some default value
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

// const handleUpdateCheckbox = async (req, res, next) => {
//   console.log('Request Params:', req.params);  
//   try {
//     const { id, publish } = req.params;

//     if (!ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid ID format" });
//     }

//     const objectId = new ObjectId(id);

//     const updatedFormData = await sliderModel.findByIdAndUpdate(
//       objectId,
//       { $set: { publish: parseInt(publish, 10) } },
//       { new: true }
//     );

//     if (!updatedFormData) {
//       return res.status(404).json({ error: "Data not found" });
//     }

//     res.status(200).json({ message: "Data updated successfully", updatedFormData });
//   } catch (error) {
//     console.error("Error updating data:", error);
//     next(error);
//   }
// };
const handleUpdateCheckbox = async (req, res, next) => {
  console.log(req.params)
  try {
    const updatedFormData = await sliderModel.findByIdAndUpdate(
      req.params.id,
      { $set: { publish: req.body.publish } },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Data not found" });
    }

    res
      .status(200)
      .json({ message: "Data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating data:", error);
    next(error);
  }
};

const handleDelete = async (req, res, next) => {
  try {
    const groupData = await sliderModel.findByIdAndDelete(req.params.id);
    if (!groupData) {
      return res.status(404).json({ error: "Data not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    next(error);
  }
};

const handleEdit = async (req, res, next) => {
  try {
    const formData = await sliderModel.findById(req.params.id);
    if (!formData) {
      return res.status(404).json({ error: "Data not found" });
    }

    // Fetch the image data associated with the slide
    const imageId =
      formData.file && formData.file.length > 0 ? formData.file[0] : null;
    const imageData = imageId ? await MediaModel.findById(imageId) : null;

    // Construct the response object with form data and image details
    const responseData = {
      formData: {
        _id: formData._id,
        title: formData.title,
        publish: formData.publish,
        editorContent: formData.editorContent,
        file: formData.file,
      },
      imageData: imageData
        ? {
            _id: imageData._id,
            filename: imageData.filename,
            // Add other image properties you may need
          }
        : null,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    next(error);
  }
};

const handleUpdate = async (req, res, next) => {
  try {
    // Check if a new file is being uploaded
    let file;
    if (req.file) {
      file = req.file.path; // Assuming multer is being used to handle file uploads
    } else {
      file = req.body.file; // If no new file is uploaded, retain the existing file path
    }

    const updatedFormData = await sliderModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          publish: req.body.publish,
          title: req.body.title,
          editorContent: req.body.editorContent,
          file: file, // Updated file path
        },
      },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ error: "Data not found" });
    }

    res
      .status(200)
      .json({ message: "Data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating data:", error);
    next(error);
  }
};

module.exports = {
  handleGet,
  handlePost,
  handleUpdateCheckbox,
  handleUpdate,
  handleDelete,
  handleEdit,
  handleGetwithoutImage
};
