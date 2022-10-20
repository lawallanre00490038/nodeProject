var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler');
    moment = require('moment');

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
        uploadDir:path.join(__dirname, 'public/upload/temp')
    }));
    // app.use(bodyparser.json());
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routes(app);//moving the routes to routes folder.
    app.use('/public/', express.static(path.join(__dirname,
    '../public')));
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    // handle bars code
    app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials']
    }).engine);
    app.set('view engine', 'handlebars');

    // We are going to add a section to define our helpers
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
        timeago: function(timestamp) {
            return moment(timestamp).startOf('minute').fromNow();
        }
        }
    }).engine);

    return app;
};
