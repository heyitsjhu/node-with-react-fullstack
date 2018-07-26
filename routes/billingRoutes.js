const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

/**! via bodyParser, we get the Stripe token data back and accessible on req.body */
//TODO : explain async/await and promises here
router.post('/api/stripe', async (req, res) => {
  /** handle token received from the stripe api */
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    source: req.body.id, // obtained from Stripe token
    description: '$5 for 5 credits.'
  });

  console.log(charge);
  /** update the user's credit count */
});

module.exports = router;
