const MediaModel2 = require('../Model/MediaModel2')
const MediaModel = require('../Model/SliderFileupload')

//on clicking the add  btn to get the uploaded image and to send/submit  the uploaded images to the table so save
const handleSubmitUploadedImg = async (req, res) => {
  const id = req.params.id;
  try {
    const formData = await MediaModel.findById(id);
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

//to get into add slide page  page

const handleGetImg = async (req, res) => {
  try {
    const imgData = await MediaModel2.find();
    res.status(200).json(imgData);
  } catch (error) {
    console.error(error);

    next(error);
  }
}



// const handleSubmitUploadedImg = async (req, res) => {
//     const id = req.params.id;
//     const formData = await MediaModel.findById(id);
//     console.log(formData);
//     try {
//       const imgData = new MediaModel2({
//         file: formData.file,
//       });
//       await imgData.save();
//       res.status(200).json(imgData);
//     } catch (error) {
//       console.error(error);
//      next(error)
//     }
//   }



//   //to get the  img after submission into the table
// const handleGetImg =   async (req, res) => {
//     try {
//       const imgData = await MediaModel2.find();
//       res.status(200).json(imgData);
//     } catch (error) {
//       console.error(error);
//      next(error)
//     }
//   }


  const hadleDelete= async (req, res,next) => {
    try {
      const id = req.params.id;
      const data = await MediaModel2.findByIdAndDelete(id);
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

  const handleSubmitCheckBox= async (req, res,next) => {
    try {
      // Create a new checkbox document and save it to the database
      const checkbox = new MediaModel2({ value: req.body.value });
  
      console.log(checkbox.value);
      res.json({ checkbox: checkbox.value });
    } catch (error) {
      console.error("Error storing value:", error);
      next(error)
    }
  }



  
  module.exports = {handleSubmitUploadedImg,handleGetImg,hadleDelete,handleSubmitCheckBox};