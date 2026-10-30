const express = require("express");
const router = express.Router();

const {
  handlePost,
  handleGet,
  handleDelete,
  handleEdit,
  handleUpdate,
} = require("../Controller/ManageAlbumController");

router.route("/submit/manage/album").post(handlePost);
router.route("/get/album/data").get(handleGet);
router.route("/delete/album/data/:id").delete(handleDelete);
router.route("/get/edit/album/data/:id").get(handleEdit);
router.route("/update/album/data/:id").put(handleUpdate);

module.exports = router;
