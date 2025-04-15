require('dotenv').config();
const express = require('express');
const path = require('path');
const expressEJSLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
//const passport = require('passport');
const moment = require('moment');
const bcrypt = require('bcrypt');
const moment_tz = require('moment-timezone');
const hotkeys = require('hotkeys-js');
const zipcodeToTimezone = require('zipcode-to-timezone');
const mongoose = require('mongoose');
const passport = require('./Config/passport');
const authRoutes = require('./Routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressEJSLayouts);
app.set('layout', 'layout'); // Set the default layout

// Static Files
app.use('/public', express.static(path.join(__dirname, 'public')));



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.user = req.user || null; // Make user available in all views
  next();
});

// Session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60, // = 14 days. Default
    }),
  }),
);
// Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

  
  

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
app.use('/auth', authRoutes);
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
