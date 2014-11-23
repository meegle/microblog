var express = require('express');
var router = express.Router();

var FUNC = require('../common/function.js');

router.route('/')
	.get(FUNC.checkLogin)
	.get(function(req, res) {
		req.session.user = null;
		return FUNC.returnData(req, res, {
			status: true,
			message: '登出成功',
			redirect: '/'
		});
	});

module.exports = router;