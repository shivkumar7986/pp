const MenuGroupModel = require("../Model/MenuGroupModel");

const handlePost = async (req, res) => {
  try {
    const groupData = new MenuGroupModel({
      groupName: req.body.groupName,
      publish: req.body.publish,
    });
    await groupData.save();
    res.status(201).json(groupData);
    console.log(groupData);
  } catch (error) {
    console.error(error);
    next(error)
  }
};

const handleGet = async (req, res) => {
  try {
    const groupData = await MenuGroupModel.find();
    res.status(201).json(groupData);
  } catch (error) {
    console.error(error);
    next(error)
  }
};

const handleDelete = async (req, res) => {
  try {
    const groupData = await MenuGroupModel.findByIdAndDelete(req.params.id);
    if (!groupData) {
      res.status(404).json({ error: "Menu data is not find" });
    }
    res.status(200).json({ message: "Data deleted successfully " });
  } catch (error) {
    console.error("Error in deleting the data", error);
    next(error)
  }
};

const handleEdit = async (req, res) => {
  try {
    console.log(req.params);
    const groupData = await MenuGroupModel.findOne({
      _id: req.params.id,
    });
    res.status(200).json(groupData);
  } catch (error) {
    console.error(error);
    next(error)  }
};

const handleUpdate = async (req, res) => {
  try {
    const updatedFormData = await MenuGroupModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          // p_id: req.body.p_id,
          groupName: req.body.groupName,
          publish: req.body.publish,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Form data updated successfully", updatedFormData });
  } catch (error) {
    console.error("Error updating form data:", error);
    next(error)  }
};
const handleUpdateCheckBox = async (req, res) => {
  try {
    const updatedFormData = await MenuGroupModel.findByIdAndUpdate(
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
    next(error)  }
};

module.exports = {
  handlePost,
  handleGet,
  handleDelete,
  handleEdit,
  handleUpdate,
  handleUpdateCheckBox,
};
