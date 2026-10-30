const express = require("express");
const router = express.Router();
const {
  handlePost,
  handleGet,
  handleDelete,
  handleEdit,
  handleUpdate,
  handleUpdateCheckBox,
} = require("../Controller/MenuGroupController");

router.route("/submit-menu-group").post(handlePost);
router.route("/get-menu-group").get(handleGet);
router.route("/delete-group-data/:id").delete(handleDelete);
router.route("/edit-group-menu/:id").get(handleEdit).put(handleUpdate);
router.route("/update-group-menu-checkbox/:id/:publish").get(handleUpdateCheckBox);

module.exports = router;
