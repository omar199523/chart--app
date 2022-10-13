const express = require("express");
const { get } = require("mongoose");
const router = express.Router();
const {setToken,getTokens,getTokenChart} = require('../controller/tokenMethod')


router.route("/").get(getTokens).post(setToken);
router.route('/chart/:id').get(getTokenChart)

module.exports = router;
