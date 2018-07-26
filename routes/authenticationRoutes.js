const express = require('express');

/*! - express.Router()
 * Express's Router() method creates a new router object, a sort of "mini-applicaton" capable only
 * of performing middleware and routing functions. This is perfect for defining an application's routes.
 * In this file, we will create a new router object instance and define our Google authentication routes.
 * Then, we export the router, making it available for importing elsewhere in our applcation, which
 * we will then include in our index.js file.
 */
const router = express.Router();
const passport = require('passport');

/*! - express routing
 * Routing refers to the definition of application end points (URIs) and how they respond to client requests.
 * A route method is derived from one of the HTTP methods, such as GET and POST. Here, we define a route
 * that will send a get request to the URI pass in, the first argurment - in our case, '/auth/google'.
 * The second argument, and any subsequent arguments, are callback functions that will get executed one after
 * another, unless otherwise instructed. A callback function behaves like middleware and handles the request
 * that's made. A typical callback function accepts two arguments, the request (req) and the response (res)
 * which the callback function can then act on to either display information, validate data, and so on.
 *
 * Here, instead of creating our own custom callback function, we are using a function called authenticate()
 * which is provided by passportjs and takes the user through the authentication process whenever a get
 * request is sent to '/auth/google'.
 *
 * For more on callbacks, read the Route Handlers section in this link:
 * http://expressjs.com/en/guide/routing.html
 */
router.get(
  '/auth/google',

  /*! - passport.authenticate()
   * The first argument passed to authenticate() is the name of the authentication strategy, as defined by
   * the module behind the strategy. For example, the strategy identifier for this particular strategy,
   * passport-google-oauth20, is 'google'. The value of the string is completely ambiguous. It can literally
   * be anything. They could have named it something else, like 'foobar'. But of course it should, and makes
   * the most sense to, closely match the name of the third-party providing the API. So, whenever you add a
   * new strategy make sure you read the documentation to ensure you're using the correct name.
   *
   * The second argument is an options object that specifies the scope of the request, and what information
   * is being requested from Google. Here, we're asking for the 'profile' and 'email' properties from Google's
   * API. The list of available properties vary between strategy providers, which can be found online.
   *
   * For Google's API scope, visit: https://developers.google.com/+/web/api/rest/oauth#authorization-scopes
   */
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/*! - express routing -- authentication callback
 * During the authentication process, our user is taken to the Google OAuth API where they are asked
 * to sign in using an existing Google account. That request is then sent back to our application,
 * via a callback URI (the first argument in the following route) as sort of a confirmation to verify
 * that our application did indeed make the request. This same URI needs to be on the Google API whitelist.
 * This is how Google ensures it is sending the user's information back to the right place and that it's
 * not being hijacked along the way.
 *
 * For more information on how this works and to set up your Google API for the authentication, visit:
 *
 *
 * Similar to the prior route, we use passport's authenticate() method again to verify the authentication
 * request. Additionally, we pass in a second callback function that redirects our user to another URI in
 * our application - '/dashboard'.
 */
router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

router.get('/api/logout', (req, res) => {
  // instruct passport to kill the current cookie in the browser
  req.logout();
  res.redirect('/');
  fd;
});

router.get('/api/current_user', (req, res) => {
  // retrieve the user from the request, and send it as a response
  res.send(req.user);
});

module.exports = router;
