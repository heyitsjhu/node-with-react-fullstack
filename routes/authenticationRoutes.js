const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
  // First Argument: the route URL
  '/auth/google',
  /*!
 * Second Argument: passport authentication method which essentially passes
 * the user's request to passport's oauth workflow.
 */
  passport.authenticate(
    // First Argument: the strategy name (or strategy's internal identifier)
    // note: different strategies may have different identifiers
    'google',
    {
      /*!
     * Second Argument: options object
     * scope specifies to Google what information we want to access for this user
     * the list of available acopes varies between strategy providers and can be found online
     * for Google's scopes: https://developers.google.com/+/web/api/rest/oauth#authorization-scopes
     */
      scope: ['profile', 'email']
    }
  )
);

router.get('/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/surveys');
  }
);

router.get('/api/logout', (req, res) => {

  // instruct passport to kill the current cookie in the browser
  req.logout();
  res.redirect('/');
});

router.get('/api/current_user', (req, res) => {
  // retrieve the user from the request, and send it as a response
  res.send(req.user);
});

module.exports = router;