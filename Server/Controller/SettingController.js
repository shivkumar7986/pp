const settingModel = require("../Model/SettingModel");

const handlePost=  async (req, res) => {
    try {
      const groupData = new settingModel({
        title: "Gallery Page",
        description: "This is a sample gallery page meta description",
        keyword: `meta, keywords, gallery, new tag   `,
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
