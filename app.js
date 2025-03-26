const express = require('express');
const path = require('path');
const expressEJSLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const moment = require('moment');
const moment_tz = require('moment-timezone');
const hotkeys = require('hotkeys-js');
const zipcodeToTimezone = require('zipcode-to-timezone');



const app = express();
const port = process.env.PORT || 3000;

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressEJSLayouts);
app.set('layout', 'layout'); // Set the default layout

// Static Files
app.use('/public', express.static(path.join(__dirname, 'public')));


// Flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.info_msg = req.flash('info_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Locals - exposed to each views
app.locals.moment = moment;
app.locals.moment_tz = moment_tz;
app.locals.hotkeys = hotkeys;
app.locals.zipcodeToTimezone = zipcodeToTimezone;

// Routes
app.use('/', require('./Routes/routes'));

// Error handling
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { title: 'An error has occurred', error: err });
}
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});