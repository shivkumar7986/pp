const express = require("express");
const router = express.Router();

const {
  handlePost,
  handleGet,
  handleDelete,
  handleEdit,
  handleUpdate,
  handleFrontendBlogData,
} = require("../Controller/BlogController");

router.route("/submit-blog-form").post(handlePost);
router.route("/get-blog-data").get( handleGet);
router.route("/delete-blog/:id").delete(handleDelete);
router.route("/get-blog-edit-data/:id").get(handleEdit);
router.route("/edit-blog/:id").put(handleUpdate);
router.route('/get-forntend-blog-data/:id',handleFrontendBlogData)
router.route('/update-blog-checkbox/:id/:frontpage',handleFrontendBlogData)
router.route('/update-blog-checkbox2/:id/:published',handleFrontendBlogData)
module.exports = router;
