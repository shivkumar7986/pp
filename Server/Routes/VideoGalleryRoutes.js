const express = require("express");
const router = express.Router();

const {
  handlePost,

} = require("../Controller/VideoGalleryController");

router.route("/submit/video/gallery/setting/data").post(handlePost);


module.exports = router;