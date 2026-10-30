
const MenuModel = require('../Model/MenuModel');
const PageModel = require('../Model/Pagemodel');
const SubMenuModel= require('../Model/SubmenuModel')
const handlePost =  async (req, res,next) => {
    try {
      let menulink = req.body.menulink;
      if (menulink === "other") {
        menulink = null; 
      }
      const menuData = new MenuModel({
        name: req.body.name,
        menutype: req.body.menutype,
        menulink: menulink,
        publish: req.body.publish,
        urlLink:req.body.urlLink
      });
      await menuData.save();
      console.log("menudta on submission"+menuData);
      res.status(201).json(menuData);
    } catch (error) {
      console.error(error);
     next(error)
    }
  }

const handleFrontapgeHeaderData = async (req, res,next) => {
    try {
      const aggregatedData = await MenuModel.find({
        menutype:"Header Menu(active)",
        publish: 'yes'
      })
      console.log("Aggregated Data:", aggregatedData);
  
      let arr = [];
  
      for (const key in aggregatedData) {
        const element = aggregatedData[key];
        let pid = element._id;
        let submenuData = await SubMenuModel.find({ p_id: pid, publish: "yes" });
        console.log("Submenu Data Length:", submenuData);
  
        let arr2 = [];
        let withoutSubmenu = {};
  
        if (submenuData.length > 0) {
          for (const key2 in submenuData) {
            const element2 = submenuData[key2];
            let Page = await PageModel.findOne({ _id: element2.menulink });
            console.log("Page Data WITH submenu:", Page);
  
            let json2 = {
              submenuName: element2.submenuname,
              submenupublish: element2.publish,
              submenulink: element2.menulink,
              submenuID: element2._id,
              subUrlLink:element2.subUrlLink,
              pageName: Page ? Page.name : null,
              pageID: Page ? Page._id : null,
              slug: Page ? Page.slug : null,
            };
            arr2.push(json2);
          }
        } else {
          let Page = await PageModel.findOne({ _id: element.menulink });
          console.log("Page Data Without Submenu:", Page);
  
          withoutSubmenu = {
            pageName: Page ? Page.name : null,
            pageID: Page ? Page._id : null,
            slug: Page ? Page.slug : null,
          };
        }
  
        let json = {
          menuName: element.name,
          menuType: element.menutype,
          menulink: element.menulink,
          urlLink:element.urlLink,
          menuID: element._id,
          submenu: arr2,
          pageData: withoutSubmenu,
        };
  
        arr.push(json);
      }
  
      res.status(200).json(arr);
    } catch (error) {
      console.error("Error:", error);
     next(error)
    }
  }


  const handleGetMenuLinkData = async (req, res,next) => {
    try {
      const formData = await PageModel.find();
      res.status(200).json(formData);
    } catch (error) {
      console.error(error);
     next(error)
    }
  }

  const handleGetAllData=  async (req, res) => {
    try {
      const formData = await MenuModel.find();
      res.status(200).json(formData);
    } catch (error) {
      console.error(error);
     next(error)
    }
  }


  const handleUpdateCheckbox = async (req, res,next) => {
   console.log(req.params) 
   try {

      const updatedFormData = await MenuModel.findByIdAndUpdate(
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

  const handleDelete = async (req, res,next) => {
    try {
      const deletedFormData = await MenuModel.findByIdAndDelete(req.params.id);
      if (!deletedFormData) {
        return res.status(404).json({ error: "Form data not found" });
      }
      res.status(200).json({ message: "Form data deleted successfully" });
    } catch (error) {
      console.error("Error deleting form data:", error);
      next(error)
    }
  }

  const handleEdit = async (req, res,next) => {
    try {
      const menuData = await MenuModel.findOne({ _id: req.params.id });
      res.status(200).json(menuData);
    } catch (error) {
      console.error(error);
     next(error)
    }
  }

  const handleUpdate=  async (req, res,next) => {
    try {
      const updatedFormData = await MenuModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
            menulink: req.body.menulink,
            menutype: req.body.menutype,
            publish: req.body.publish,
            urlLink:req.body.urlLink
          },
        },
        { new: true }
      );
  
  
      res
        .status(200)
        .json({ message: "Form data updated successfully", updatedFormData });
    } catch (error) {
      console.error("Error updating form data:", error);
      next(error)
    }
  }

  const handleFrontapgeFooterData= async (req, res,next) => {
    try {
      const formData = await MenuModel.find({ menutype: " Footer menu(active)" });
      res.status(200).json(formData);
    } catch (error) {
      console.error(error);
     next(error)
    }
  }

  const handleFrontapgeLeftSideData=  async (req, res,next) => {
    try {
      const formData = await MenuModel.find({
        menutype: "Left side bar (active)",
      });
      res.status(200).json(formData);
    } catch (error) {
      console.error(error);
     next(error)
    }
  }
  module.exports= {handlePost,handleFrontapgeHeaderData,handleGetMenuLinkData,handleGetAllData,handleUpdateCheckbox,handleDelete,handleEdit,handleUpdate,handleFrontapgeFooterData,handleFrontapgeLeftSideData};