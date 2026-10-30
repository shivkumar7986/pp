const express = require('express')
const router = express.Router()
const upload= require('../MulterMediaStorage')

const {handlePost,handleGetImgtoPopup} = require('../Controller/Mediauploadcontroller')

router.route('/upload/media/file').post(upload.single("file"),handlePost)

router.route('/get/media/file').get(handleGetImgtoPopup)

module.exports = router;