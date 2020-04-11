const express = require('express');
const passport = require('./config/passportConfig.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 4000;


// =============================================================================
// MISC APP SET UP
// =============================================================================

// Initialize Passport and restore authentication state, if any, from the session.
app.use(require('express-session')({ 
    secret: '1 l0v3 b4sk3tb4ll', 
    resave: false, 
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('morgan')('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'pug');
app.use('/static', express.static('public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/', require('./routes'));



sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })



// =============================================================================
// ERROR HANDLING
// =============================================================================

process.on('unhandledRejection', r => console.error(r));
process.on('warning', e => console.error(e));
process.on('uncaughtException', e => console.error(e));
process.on('SIGINT', () => {

    console.log('\nReceived interrupt signal. Closing MySQL connections...');

    sequelize.close().then(() => {
        console.log('MySQL connections closed');
        process.exit(0);
    });
});

module.exports = app;