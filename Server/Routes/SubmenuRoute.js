const express= require('express')
const router = express.Router();
const {handlePost,handleGetData,handleGetParentSubmenu,handleGetPageData,handleUpdateCheckbox ,handleDelete,handleEdit ,handleUpdate }= require('../Controller/SubmenuController')



router.route('/submit-submenu').post(handlePost)
router.route('/get-submenuForm-data/:id').get(handleGetData)
router.route('/get-parent-submenu-data/:id').get(handleGetParentSubmenu)
router.route('/get-main-menu-data').get(handleGetPageData)
router.route('/update-submenu-checkbox/:id/:publish').get(handleUpdateCheckbox)
router.route('/delete-sub-menu/:id').delete(handleDelete)
router.route('/get-edit-sub-menu-data/:id').get(handleEdit)
router.route('/edit-sub-menu/:id').put(handleUpdate)


module.exports = router;