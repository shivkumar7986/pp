const express = require('express')
const router= express.Router()
const {handleSubmitUploadedImg,handleGetImg,hadleDelete,handleSubmitCheckBox}=require('../Controller/MediaController2')



// router.route("/upload/home/slider/img/:id").get(handleGet);
// router.route("/get-add-home-slider-img").get(handleGetHomesliderdata);

router.route('/add/img/:id').get(handleSubmitUploadedImg)




router.route('/get-add-img').get(handleGetImg)
router.route('/delete/img/:id').delete(hadleDelete)
router.route('/submit/checkbox-value').post(handleSubmitCheckBox)



module.exports = router