var express = require('express');
var router = express.Router();

var Post = require('../models/Post.js');

/* GET home page. */
router.get('/', function(req, res) {
	Post.find(1, 1, function(err, list) {
		if (err) list = [];
		res.render('index', {
			title: '首页',
			list: list
		});
	});
});

module.exports = router;
