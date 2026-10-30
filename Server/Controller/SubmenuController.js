const SubMenuModel = require('../Model/SubmenuModel')
const MenuModel= require('../Model/MenuModel')
const PageModel = require('../Model/Pagemodel')

const mongoose = require('mongoose')
const SubmenuModel = require('../Model/SubmenuModel')



const handlePost = async (req, res, next) => {
  try {

    const submenuData = new SubMenuModel({
      p_id: req.body.p_id,
      submenuname: req.body.submenuname,
      parentMenuName: req.body.parentMenuName,
      menulink:req.body.menulink,
      publish: req.body.publish,
      subUrlLink: req.body.subUrlLink
    });
    await submenuData.save();
    console.log(submenuData);
    res.status(201).json(submenuData);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
const handleGetData = async (req, res) => {
    try {
      const formData = await SubMenuModel.find({ p_id: req.params.id });
      res.status(200).json(formData);
    } catch (error) {
      console.error(error);
      next(error)    }
  }
const handleGetParentSubmenu = async (req, res) => {
    try {
      const menuData = await MenuModel.findOne({ _id: req.params.id });
      res.status(200).json(menuData);
    } catch (error) {
      console.error(error);
      next(error)    }
  }
//for menu link-getting  page  data in  the menu  page
const handleGetPageData=  async (req, res) => {
    try {
      const formData = await PageModel.find();
      res.status(200).json(formData);
    } catch (error) {
      console.error(error);
      next(error)    }
  }

  const handleUpdateCheckbox = async (req, res,next) => {
    
    
    console.log(req.params)
    try {
      const updatedFormData = await SubmenuModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            publish: req.params.publish,
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
      next(error)
    }
  }


  const handleDelete= async (req, res) => {
    try {
      const submenuData = await SubMenuModel.findByIdAndDelete(req.params.id);
      if (!submenuData) {
        return res.status(404).json({ error: "submenu data is not find " });
      }
      res.status(200).json({ message: "Submenu data delleted successfully" });
    } catch (error) {
      console.error("error in deleting the submenu data ", error);
      next(error)    }
  }

  const handleEdit= async (req, res) => {
    try {
      console.log(req.params);
      const submenuData = await SubMenuModel.findOne({
        _id: req.params.id,
      });
      console.log("Submenu Data:", submenuData); // Add this line
      res.status(200).json(submenuData);
    } catch (error) {
      console.error(error);
      next(error)    }
  }

  const handleUpdate = async (req, res,next) => {
    try {
      const updatedFormData = await SubMenuModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            p_id: req.body.p_id,
            submenuname: req.body.submenuname,
            menulink: req.body.menulink,
            parentMenuName: req.body.parentMenuName,
            publish: req.body.publish,
            subUrlLink:req.body.subUrlLink
          },
        },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Form data updated successfully", updatedFormData });
    } catch (error) {
      console.error("Error updating form data:", error);
      next(error)    }
  }
module.exports = {handlePost,handleGetData,handleGetParentSubmenu,handleGetPageData,handleUpdateCheckbox,handleDelete,handleEdit,handleUpdate}