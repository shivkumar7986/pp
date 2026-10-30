const BlogImgModel = require("../Model/BlogUploadImgModel");
const path = require("path");



const handlePost = async (req, res, next) => {
  try {
    const formData = new BlogImgModel({
      filename: req.file.filename,
    

    })

    console.log(formData)
    await formData.save();
    res.status(200).send("Form data saved successfully!");
  } catch (error) {
    console.error(error);
   next(error)
  }
}


const handleGetImgtoPopup = async (req, res,next) => {
  try {
    const formData = await BlogImgModel.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
   next(error)
  }
}


const handleGet = async (req, res) => {
  const id = req.params.id;
  try {
    const formData = await BlogImgModel.findById(id);
    if (!formData) {
      console.log(`No data found for ID: ${id}`);
      return res.status(404).json({ error: "Image not found" });
    }
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    next(error);
  }
};





// // Inside BlogUploadoImgController.js
// const handleAddImages = async (req, res, next) => {
//   try {
//     const { images } = req.body;
//     images.forEach(image => {
//       console.log(`Image ID: ${image._id}, Filename: ${image.filename}`);
//       // Now, you can save this data to your database or perform any other necessary operations
//     });

//     res.status(200).json({ success: true, message: "Images added successfully." });
//   } catch (error) {
//     console.error("Error adding images:", error);
//     next(error);
//   }
// };

;
const handleGetSelectedImages = async (req, res, next) => {
  try {
    // Fetch selected images from the database
    const selectedImages = await BlogImgModel.find( req.body  );
    // Check if selectedImages is empty
    if (!selectedImages || selectedImages.length === 0) {
      console.log("No selected images found.");
      return res.status(404).json({ message: "No selected images found." });
    }

    // Return selected images
    res.status(200).json(selectedImages);
  } catch (error) {
    console.error("Error fetching selected images:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const handleDelete= async (req, res, next) => {
  try {
    const { id } = req.params;
    // Find the image by ID and delete it
    await BlogImgModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Image deleted successfully.' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, message: 'Failed to delete image.' });
  }
}
module.exports = { handlePost, handleGet, handleDelete,handleGetImgtoPopup, handleGetSelectedImages };



