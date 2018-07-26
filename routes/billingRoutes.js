const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

/**! via bodyParser, we get the Stripe token data back and accessible on req.body */
//TODO : explain async/await and promises here
//TODO : explain requireLogin middleware function call
router.post('/api/stripe', requireLogin, async (req, res) => {
  /** handle token received from the stripe api */
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    source: req.body.id, // obtained from Stripe token
    description: '$5 for 5 credits.'
  });

  console.log(charge);
  /** update the user's credit count */
  //TODO: req.user is a passport.js feature
  req.user.credits += 5;
  //TODO: assigning a newly saved user model that's returned to a new variable can help against
  // using stale or outdated user information that came back from the initial request.
  const user = await req.user.save();

  // respond and send back the user to the application
  //TODO : send back? back to where?
  res.send(user);
});

module.exports = router;
