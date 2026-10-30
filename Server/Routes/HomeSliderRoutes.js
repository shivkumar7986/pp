const express = require("express");
const router = express.Router();

const {
  handleGet,
  handleGetHomesliderdata,
  handleSubmitCheckBox,
  handleDelete,
 
} = require("../Controller/HomeSliderController");

router.route("/upload/home/slider/img/:id").get(handleGet);
router.route("/get-add-home-slider-img").get(handleGetHomesliderdata);
router.route("/delete/home/slider/img/:id").delete(handleDelete);
router.route("/submit/home/silder/checkbox-value").post(handleSubmitCheckBox);


module.exports = router;
