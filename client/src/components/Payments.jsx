import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        /** Stripe amount value defaults to USD and is represented as cents */
        amount={500}
        /** Expects a callback function to be executed once we receive an authorization token from Stripe */
        token={token => console.log(token)}
        /** our publishable api key from out .env file */
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        /** Including a button element as a child overrides Stripe's default button */
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default Payments;
