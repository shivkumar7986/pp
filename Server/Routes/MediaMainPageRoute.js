const express = require("express");
const router = express.Router();

const {
    handleAddImageToMedia,
    handleGetMediaImages,
    hadleDelete,handleSubmitCheckBox



} = require("../Controller/MediaMainPage");
const upload = require('../MulterStorage')



router.route("/media/add/image").post( upload.array('file'),handleAddImageToMedia);
router.route("/media/get/images").get( handleGetMediaImages);
router.route("/media/delete/images/:id").delete( hadleDelete);
// router.route("/media/frontpage/images").get( handleSubmitCheckBox);
router.put('/media/toggle/:id', handleSubmitCheckBox);// router.route("/update-slide-checkbox/:id/:frontpage").get(handleSubmitCheckBox);


module.exports = router;
