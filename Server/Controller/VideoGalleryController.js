const videoGallerysettingModel = require("../Model/VideoGalleryModel");

const handlePost =async (req, res) => {
    try {
      const groupData = new videoGallerysettingModel({
        title: "Contact meta title",
        description: "contact meta description",
        keyword: "contact, new , keywords",
        publish: req.body.publish,
        select: req.body.select,
        videoperPage: req.body.videoperPage,
      });
      await groupData.save();
      res.status(201).json(groupData);
      console.log(groupData);
    } catch (error) {
      console.error(error);
      next(error)    }
  }

module.exports = {
    handlePost,
   
  };
  