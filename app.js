var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
//配置session
var sess = {
    secret: 'keyboard cat',
    cookie: {}
};
if (app.get('env') === 'production') {
    app.set('trust proxy', 1);// trust first proxy
    sess.cookie.secure = true;// serve secure cookies
}
app.use(session(sess));

//全局设置
var util = require('util');
app.locals.inspect = function(obj) {
    return util.inspect(obj, true);
};
app.use(function(req, res, next) {
    res.locals.req = req;
    //网站全局配置
    res.locals.title = 'Meegle';
    res.locals.user = req.session.user;
    res.locals.error = (function() {
        var err = req.flash('error');
        if (err.length) {
            return err;
        } else {
            return null;
        }
    })();
    res.locals.success = (function() {
        var succ = req.flash('success');
        if (succ.length) {
            return succ;
        } else {
            return null;
        }
    })();
    next();
});

//微博路由
app.use('/', require('./routes/index'));
app.use('/u', require('./routes/user'));
app.use('/post', require('./routes/post'));
app.use('/reg', require('./routes/reg'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
