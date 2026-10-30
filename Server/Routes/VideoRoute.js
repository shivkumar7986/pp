const express = require("express");
const router = express.Router();

const {
  handlePost,
  handleGetVideo,

  handleUpdateCheckbox,
  handleDelete,
  handleEdit,
  handleUpdate,
} = require("../Controller/VideoController");

router.route("/submit/video-data").post(handlePost);
router.route("/get/video/data").get(handleGetVideo);
router.route("/delete/video/data/:id").delete(handleDelete);
router.route("/update-video-checkbox/:id/:publish").get(handleUpdateCheckbox);
router.route("/edit/video/data/:id").get(handleEdit);
router.route("/update/video/data/:id").put(handleUpdate);

module.exports = router;
