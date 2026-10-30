const express = require("express");
const router = express.Router();

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const {
  handlePost,
  
  handleGet,
  handleGetImgtoPopup,
  handleDelete,
  handleGetSelectedImages
} = require("../Controller/BlogUploadoImgController");

router.route("/upload/blog/img").post(upload.single('image'), handlePost);
router.route("/add/images/:id").get(handleGet);
router.route("/get/blog/upload/img").get(handleGetImgtoPopup);
router.route("/get/selected/images").get(handleGetSelectedImages);
router.route("/delete-image/:id").delete(handleDelete)
module.exports = router;
