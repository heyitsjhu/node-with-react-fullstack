const passport = require('passport');

/*! - Google Authentication Strategy
 * Passport uses what is known as strategies to perform its authentication process.
 * The strategy below uses Google's OAuth API to sign users into the application.
 * The module's Strategy property is assigned to a variable called GoogleStrategy,
 * which will be used by passport to begin a new authentication request.
 * For a list of other authentication strategies, visit http://passportjs.org/docs
 * and click on the Strategies link on the sidebar.
 *
 * To learn morethe Google passport authentication API, visit:
 * https://github.com/jaredhanson/passport-google-oauth2
 */
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

/*! - User.js
 * Here, we import the User model schema so it can be utilized in this file.
 * We use the schema, which is assigned to the variable User, to query the
 * database for a specific user given a set of credentials. We will also use
 * the schema to create a new user if the current user doesn't already exist
 * in the database.
 */
const User = require('../models/User');

// create a unique cookie for a user when he/she signs in
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

/*! - passport js -- passport.use()
 * takes a single argument representing the authentication
 * strategy that passport JS should use to authenticate users.
 * for example: here we're telling passport js to use a Google authentication strategy
 */
passport.use(
  new GoogleStrategy(
    {
      /*! Client ID and Secret
       * create a new Google api product at: console.developers.google.com/
       * then create credentials and obtain a clientID and clientSecret
       * note: NEVER HARD CODE THE CLIENT SECRET! Refer to ./config/keys.js
       */

      /*! Google Strategy options
       * First Argument: an object containing, at minimum, the clientID, clientSecret and callbackUrl
       *   the clientID and clientSecret values should correspond to the clientID and clientSecret
       *   from your newly created Google api product (see above comment)
       *   the callbackUrl's value should be the route that the user goes back to once they
       *   grant authentication access through Google's api.
       *   note: the callbackUrl value listed here must be present in your Google api product's
       *   list of "Authorized redirect URIs".
       */
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },

    /*! - second argurment -- verify callback function
     * In this particular case, an asynchronous function is performed, using async, to check
     * if a user with a given data point exist in the database. When an async function is called,
     * it returns a Promise. And when the function returns a value, the Promise will be resolved
     * with the returned value. Within an the async function can be an await expression. An await
     * expression effectively pauses the async function and waits for the passed Promise's resolution
     * before it resumes the function's execution and returns the resolved value.
     *
     * For more on async/await, visit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
     */
    async (accessToken, requestToken, profile, done) => {
      /*! - mongoose -- queries.findOne()
       * Mongoose comes with a set of query methods that enable an application to essentially ping and
       * retrieve information from a table within a database. Here, we access the users table and call
       * the findOne() method to query the database which returns the first found record in the database
       * and, in our case, assigns it to the variable, existingUser. Some queries also have additional
       * argument options you can utilize, as well as the ability to use callback functions.
       *
       * To learn more about mongoose queries, visit: http://mongoosejs.com/docs/queries.html
       */
      const existingUser = await User.findOne({ googleId: profile.id });

      /*!
       * Notice that the query above uses await to pause the async function's execution until its own
       * execution is resolved before proceeding. Only then does the following code executes.
       *
       * If a user with the given credentials exist in the database, the done() method is invoked
       * and the authenticated user is passed onto Passport. If the credentials are not valid, then
       * done() would return false - i.e., done(null, false)
       *
       * If we couldn't find a user with the given credentials, the function moves onto to the bit of
       * code that performs another await execution - this time creating a new User record with the
       * given credentials and saves it to the database. Once that finished, the done() method is
       * invoked and the user - whose record was just created - is passed onto Passport.
       *,
       */
      if (existingUser) {
        return done(null, existingUser);
      }
      // profile id not in database; make a new record
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
