const pageModel = require("../Model/Pagemodel");
const menuModel = require("../Model/MenuModel");
const blogMOdel = require("../Model/BlogModel");
const mediaModel = require("../Model/MediamainPageModel");

const handlepageCount = async (req, res, next) => {
  try {
    const pageCount = await pageModel.countDocuments();
    const dashboardCount = {
      pageCount,
    };
    console.log("PAGECOUNT"+pageCount);

    res.status(200).json(dashboardCount);
  } catch (error) {
    console.error("Error fetching dashboard :", error);
    next(error);
  }
};
const handleMenuCount = async (req, res, next) => {
  try {
    const menucount = await menuModel.countDocuments();
    console.log("menucount"+menucount);
    const dashboardCount2 = {
      menucount,
    };

    res.status(200).json(dashboardCount2);
  } catch (error) {
    console.error("Error fetching dashboard :", error);
    next(error);
  }
};
const handleblogCount = async (req, res, next) => {
  try {
    const blogCount = await blogMOdel.countDocuments();
    console.log("blogCount"+blogCount);
    const dashboardCount2 = {
      blogCount,
    };

    res.status(200).json(dashboardCount2);
  } catch (error) {
    console.error("Error fetching dashboard :", error);
    next(error);
  }
};


const handleMediaCount = async (req, res, next) => {
  try {
    const MediaCount = await mediaModel.countDocuments();
    console.log("MediaCount"+MediaCount);
    const dashboardCount2 = {
      MediaCount,
    };

    res.status(200).json(dashboardCount2);
  } catch (error) {
    console.error("Error fetching dashboard :", error);
    next(error);
  }
};


module.exports = { handlepageCount,handleMenuCount,handleblogCount, handleMediaCount};
