const express = require("express");
const router = express.Router();

const {
  handlePost,
  handleGet,
  handleDelete,
  handleEdit,
  handleUpdate,
} = require("../Controller/CategoryController");

router.route("/submit-category-form").post(handlePost);
router.route("/get-category-data").get(handleGet);
router.route("/delete/slider/img/:id/delete/category/:id").delete(handleDelete);
router.route("/get-category-edit-data/:id").get(handleEdit);
router.route("/update-edit-category/:id").put(handleUpdate);

module.exports = router;
