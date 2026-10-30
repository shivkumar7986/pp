const express = require("express");
const router = express.Router();

const {
  handlePost,
  handleGet,
  handleUpdateCheckbox,
  handleDelete,
  handleEdit,
  handleUpdate,
  handleGetwithoutImage
} = require("../Controller/SliderController");
const upload = require('../MulterStorage')



router.route("/add").post( upload.array('file'),handlePost);
router.route("/get/slides").get( handleGet);
router.route("/get/slides/without/image").get(handleGetwithoutImage);
router.route("/delete/slider/img/:id").delete(handleDelete);
router.route("/update/slide/checkbox/:id/:publish").get(handleUpdateCheckbox);
router.route("/get-slide-data/:id").get(handleEdit);
router.route("/edit/slide/:id").put(upload.single('file'), handleUpdate);

module.exports = router;
