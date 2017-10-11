
/*! - expressjs -- web framework (https://expressjs.com)
 * Express provides a set of features for web apps like routes and middleware
 * Routes, which are derived from HTTP methods, let us request and receive (the response) data from the web.
 * Middleware, or functions, let us make changes to the request and response objects that Express sends back.
 * In this file, we use express's use() method to setup a couple middlewares - specifically, cookie-session
 * and passport js - which will be called every time a request is made on our application (app).
 */
const express = require('express');
const mongoose = require('mongoose');

/*! - cookie-session -- cookie-based session (https://github.com/expressjs/cookie-session)
 * Cookie-session stores data returned from a request in the user's browser (client-side).
 * A popular use for cookies is to store a user's session - or in other words, capture whether a user is
 * logged into the application or not. By doing this, the application won't need to authenticate the user
 * everytime he/she makes a request.
 */
const cookieSession = require('cookie-session');

/*! - passportjs -- authentication (http://passportjs.org)
 * Passport lets you authenticate users through an email/password combo or a third-party provider,
 * such as Facebook, Google, Github, and many more. These are called authentication strategies.
 * You can use any number of strategies in an application.
 */
const passport = require('passport');


const keys = require('./config/keys');
const PORT = process.env.PORT || 5000;
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

// calling express creates an instance of an express application
// you can have multiple application instances running at the same
// time, but this is not very common
const app = express();

// instruct express to use cookieSession middleware
app.use(
  cookieSession({
    // how long the cookie with exist before it effectively expires
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // key(s) to be used to sign or encrypt the cookie
    // if multiple keys are given, express will pick and use one to
    // encrypt the cookie
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.listen(PORT, () => {
  console.log('server is running on PORT ' + PORT);
});
