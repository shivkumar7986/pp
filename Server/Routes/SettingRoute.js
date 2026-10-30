const express = require("express");
const router = express.Router();

const {
  handlePost,
  

  
} = require("../Controller/SettingController");

router.route("/submit/setting/data").post(handlePost);


module.exports = router;