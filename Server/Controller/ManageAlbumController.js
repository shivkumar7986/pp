
const manageAlbumModel = require("../Model/ManageAlbumModel");


const handlePost = async (req, res) => {
    try {
      const AlbumData = new manageAlbumModel({
        name: req.body.name,
        editorContent: req.body.editorContent,
      });
      await AlbumData.save();
      res.status(200).json(AlbumData);
      console.log(AlbumData);
    } catch (error) {
      console.error(error, "Error in submitting the data ");
      next(error)
    }
  }
const handleGet =async (req, res) => {
    try {
      const response = await manageAlbumModel.find();

      res.status(200).json(response);
      console.log(response);
    } catch (error) {
      console.error(error, "Error in getting the data");
     next(error)
    }
  }
const handleDelete = async (req, res) => {
    try {
      const id = req.params.id;
      const albumData = await manageAlbumModel.findByIdAndDelete(id);
      if (!albumData) {
        res.status(404).json({ error: "Data not founded" });
      } else {
        res.status(200).json({ message: " Data deleted successfully  " });
      }
    } catch (error) {
      console.error("Error in deleting the data", error);
      next(error)
    }
  }
const handleEdit =async (req, res) => {
    try {
      const videoData = await manageAlbumModel.findOne({
        _id: req.params.id,
      });
      res.status(200).json(videoData);
    } catch (error) {
      console.error(error);
     next(error)
    }
  }
const handleUpdate = async (req, res) => {
    try {
      const id = req.params.id;
      const response = await manageAlbumModel.findByIdAndUpdate(
        id,
        {
          $set: {
            name: req.body.name,
            editorContent: req.body.editorContent,
          },
        },
        {
          new: true,
        }
      );
  
      res.status(200).json({ message: "Data updated successfully", response });
    } catch (error) {
      console.error("Error in fetching the data ", error);
      next(error)
    }
  }




module.exports = {
    handlePost,
    handleGet,
    handleDelete,
    handleEdit,
    handleUpdate,
  };
  