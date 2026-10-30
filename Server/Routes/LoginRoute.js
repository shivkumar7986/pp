const handleLogin = require('../Controller/LoginController');
const express = require('express');
const router = express.Router()

router.route('/login').post(handleLogin)
module.exports=router
