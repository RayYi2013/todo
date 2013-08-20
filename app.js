var express = require('express')
    ,routes = require('./config/routes'),
    http = require('http'),
    path = require('path'),
    engine = require('ejs-locals'),
    util = require('util'),
    sessionHelper = require('./app/helpers/sessionHelper'),
    app = module.exports = express(),
    db = require( './app/dal/db' );

process.on('SIGTERM', function() {
    console.log('Web server shutting down.');
});



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({
    secret: 'keyboard cat'
}));

app.use(sessionHelper.current_user);


// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

routes.initializeRoutes(app);

//this is for unit test.
if (!module.parent) {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('API server listening on port ' + app.get('port'));
        console.log('Environment: ' + app.get('environment'));
    });
}