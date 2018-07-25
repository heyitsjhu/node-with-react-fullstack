const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

/**! via bodyParser, we get the Stripe token data back and accessible on req.body */
router.post('/api/stripe', (req, res) => {
  /** handle token received from the stripe api */
  stripe.charges.create(
    {
      amount: 500,
      currency: 'usd',
      source: req.body.id, // obtained from Stripe token
      description: '$5 for 5 credits.'
    },
    function(err, charge) {
      // asynchronously called
    }
  );
  /** update the user's credit count */
});
