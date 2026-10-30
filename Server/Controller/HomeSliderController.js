const HomesliderModel = require("../Model/HomeSliderModel");
const MediaModel = require("../Model/SliderFileupload");

//to get uploaded data to send to another page on clicking the add button

const handleGet = async (req, res) => {
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

const handleGetHomesliderdata = async (req, res) => {
  try {
    const imgData = await HomesliderModel.find();
    res.status(200).json(imgData);
  } catch (error) {
    console.error(error);

    next(error);
  }
}
const handleDelete = async (req, res) => {
  try {
    const groupData = await HomesliderModel.findByIdAndDelete(req.params.id);

    if (!groupData) {
      return res.status(404).json({ error: " data not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error in deleting the data", error);

    next(error)
  }
}


const handleSubmitCheckBox = async (req, res) => {
  try {
    // Create a new checkbox document and save it to the database
    const checkbox = new HomesliderModel({ value: req.body.value });

    console.log(checkbox.value);
    res.json({ checkbox: checkbox.value });
  } catch (error) {
    console.error("Error storing value:", error);

    next(error);
  }
};

module.exports = {
  handleGet,
  handleGetHomesliderdata,
  handleDelete,
  handleSubmitCheckBox,
};
