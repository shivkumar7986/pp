const express = require('express')
const router = express.Router()
const upload= require('../MulterStorage')

const {handlePost,handleGetImgtoPopup} = require('../Controller/SliderFileupload')

router.route('/upload-img').post(upload.single("file"),handlePost)
router.route('/get-img').get(handleGetImgtoPopup)
module.exports = router;