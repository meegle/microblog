var express = require('express');
var router = express.Router();

var _ = require('underscore');

var User = require('../models/User.js');
var Post = require('../models/Post.js');
var FUNC = require('../common/function.js');

router.route('/:user')
	.get(function(req, res) {
		User.find('username', req.params.user, function(err, user) {
			if (!user.length) {
				return FUNC.returnData(req, res, {
					status: false,
					message: '用户不存在',
					redirect: '/'
				});
			}
			user = _.first(user);
			Post.find('user', user.username, function(err, posts) {
				if (err) {
					return FUNC.returnData(req, res, {
						status: false,
						message: err,
						redirect: '/'
					});
				}
				res.render('user', {
					title: user.username,
					list: posts
				});
			});
		});
	});

module.exports = router;
