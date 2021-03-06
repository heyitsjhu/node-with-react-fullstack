/*! - expressjs -- web framework (https://expressjs.com)
 * Express provides a set of features for web apps like routes and middleware
 * Routes, which are derived from HTTP methods, let us request and receive (the response) data from the web.
 * Middleware, or functions, let us make changes to the request and response objects that Express sends back.
 * In this file, we use express's use() method to setup a couple middlewares - specifically, cookie-session
 * and passport js - which will be called every time a request is made on our application (app).
 */
const express = require('express');

/*! - mongoose -- mongoDB schema-based object modeling (http://mongoosejs.com/)
 * Mongoose is a middleware that helps connect our application to a mondoDB database. It simplifies the process
 * by providing built-in type casting, validation, query building, business logic hooks and more, out of the box.
 */
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
 * You can use any number of strategies within an application.
 */
const passport = require('passport');

const bodyParser = require('body-parser');

/*! - keys.js -- configuration and api keys
 * When we build applications, there is inevitably going to be sensitive information that we don't
 * want to make public - especially in repos - but need in order for the application to run properly.
 * Examples include API keys, database information and other keys or hashes. A keys.js file will store
 * the app's sensitive information, which is then imported here and assigned to a variable - named keys.
 */
const keys = require('./config/keys');

mongoose.connect(
  keys.mongoURI,
  {
    useMongoClient: true
  }
);

/*! - PORT
 * A port is defined as a communication endpoint and is always associated with an IP address of a host
 * and the protocol type of the communication. For example, on most local environments, the host is
 * oftentimes 'localhost' and the default port assigned is 3000. Therefore, to access your application
 * you would navigate to http://localhost:3000.
 *
 * Here, we are using the OR (||) operator to dynamically assign our PORT depending on the environment
 * our application is running in. If it's in a production environment, our constant variable will be
 * assigned to a port defined by our host provider (i.e., Heroku), via the process.env.PORT environment
 * variable. If it's in a development environment, then process.env.PORT would be undefined, and as a
 * result, port 5000 will be assigned to the constant variable.
 */
const PORT = process.env.PORT || 5000;

/*!
 *
 */
// require('./models/User');
require('./models/Survey');
require('./services/passport');

const authenticationRoutes = require('./routes/authenticationRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

// calling express creates an instance of an express application
// you can have multiple application instances running at the same
// time, but this is not very common
const app = express();

/**! app.use is for loading express middleware */

app.use(bodyParser.json());

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

app.use('/', authenticationRoutes);
app.use('/', billingRoutes);
app.use('/', surveyRoutes);

// production configuration to properly handle client-side routes
if (process.env.NODE_ENV === 'production') {
  //TODO: express serves react production assets (js, css, etc)
  app.use(express.static('client/build')); // points to react folder's build (dist) assets
  //TODO: express serve index.html if route requested in not found
  // wildcard route
  const path = require('path');
  app.get('*', (req, res) => {
    // defers all unknown server-side routes to the client-side code via index.html file in the client build folder
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('server is running on PORT ' + PORT);
});
