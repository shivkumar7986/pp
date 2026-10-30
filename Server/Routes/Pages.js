const express = require('express')
const router = express.Router()
const {handlePost,handleGet,handleFrontendDataShow,handleEdit,handleDelete,handleUpdate,handlePublishpageCheckboxUpdate,handleFrontpageCheckboxUpdate} = require('../Controller/PageController')


router.route('/submit-form').post(handlePost)
router.route('/get-form-data').get(handleGet)
router.route('/get-forntend-data/:id').get(handleFrontendDataShow)
router.route('/get-form-data/:id').get(handleEdit)
router.route('/delete/:id').delete(handleDelete)
router.route('/edit/:id').put(handleUpdate)
router.route('/update-checkbox/:id/:frontpage').get(handleFrontpageCheckboxUpdate)
router.route('/update-checkbox2/:id/:published').get(handlePublishpageCheckboxUpdate)

// router.route('/submit-form').get(handlePost)
module.exports= router;