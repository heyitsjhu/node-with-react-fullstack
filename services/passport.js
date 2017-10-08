// user authentication middleware
const passport = require('passport');

// passport JS authentication strategy for Google accounts
// note: we only need the Strategy property from the module
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// mongoDB middleware for creating and saving models
const mongoose = require('mongoose');

// import the collection of keys object from keys.js in the config
// folder and assign that object to our keys constant variable
const keys = require('../config/keys');

// pull a model schema out of the database (fetch)
// User now becomes the model class which can now be
// used to create a new instance of a user
const User = mongoose.model('users');

// create a unique cookie for a user when he/she signs in
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

/*! passport.use() 
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
      proxy: true
    },
    /*!
       * Second Argument: callback function
       */
    (accessToken, requestToken, profile, done) => {
      /*! Mongoose User Creation
       * check if a user, based on the googleId, exist in the database
       */
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // a record with given profile id already exist
          // signify to mongo that we're done with the authentication process
          // First Argument: represents any errors; in this case, null
          done(null, existingUser);
        } else {
          // profile id not in database; make a new record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
