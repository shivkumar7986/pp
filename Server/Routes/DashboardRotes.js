// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();

const { handlepageCount,handleMenuCount,handleMediaCount,handleblogCount } = require('../Controller/DashboardController');

router.route("/dashboard/pagecount").get(handlepageCount);
router.route("/dashboard/menucount").get(handleMenuCount);
router.route("/dashboard/mediacount").get(handleMediaCount);
router.route("/dashboard/blogcount").get(handleblogCount);

module.exports = router;
