var FUNC = {};
//返回方式
FUNC.returnData = function(req, res, data) {
	if (req.xhr) {//通过AJAX方式提交
		res.end(JSON.stringify(data));
	} else {
		req.flash(data.status?'success':'error', data.message);
		res.redirect(data.redirect);
	}
	return false;
};
//判断用户登录状态，否则报错
FUNC.checkLogin = function(req, res, next) {
	if (!req.session.user) {
		return FUNC.returnData(req, res, {
			status: false,
			message: '未登入',
			redirect: '/login'
		});
	}
	next();
};
//判断用户非登录状态，否则报错
FUNC.checkNotLogin = function(req, res, next) {
	if (req.session.user) {
		return FUNC.returnData(req, res, {
			status: false,
			message: '已登入',
			redirect: '/'
		});
	}
	next();
};
module.exports = FUNC;