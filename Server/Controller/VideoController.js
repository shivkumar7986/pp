const videoModel = require("../Model/VideoModel");

const handlePost = async (req, res) => {
  try {
    const videoData = new videoModel({
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      publish: req.body.publish,
    });
    await videoData.save();
    res.status(200).json(videoData);
    console.log(videoData);
  } catch (error) {
    console.error("error in storing value  ", error);
   next(error)
  }
};


const handleGetVideo =  async (req, res) => {
    try {
      const videoData = await videoModel.find();
      res.status(200).json(videoData);
    } catch (error) {
      console.error(error, "error in getting the image");
      next(error)    }
  }

  const handleDelete = async (req, res) => {
    try {
      const id = req.params.id;
      const videoData = await videoModel.findByIdAndDelete(id);
      if (!videoData) {
        res.status(404).json({ error: "Video not founded" });
      } else {
        res.status(200).json({ message: " Video deleted successfully  " });
      }
    } catch (error) {
      console.error("Error in deleting the video", error);
      next(error)    }
  }

  const handleUpdateCheckbox = async (req, res) => {
    try {
      const updatedFormData = await videoModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            publish: req.params.publish,
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
      next(error)    }
  }

  const handleEdit = async (req, res) => {
    try {
      const videoData = await videoModel.findOne({
        _id: req.params.id,
      });
      res.status(200).json(videoData);
    } catch (error) {
      console.error(error);
     next(error)
    }
  }

  const handleUpdate= async (req, res) => {
    try {
      const videoData = await videoModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            // p_id: req.body.p_id,
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            publish: req.body.publish,
          },
        },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Form data updated successfully", videoData });
    } catch (error) {
      console.error("Error updating form data:", error);
      next(error)    }
  }
module.exports = {
  handlePost,
  handleGetVideo,
  handleDelete,
  handleUpdateCheckbox,
  handleEdit,
  handleUpdate,
};
