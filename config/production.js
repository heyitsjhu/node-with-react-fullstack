/*! - production.js
 *
 * In most production environments - for example, platforms like Heroku - there
 * is a setting where you can add environment variables for your application.
 * You can then reference those variables here as part of the process.env property.
 *
 * Because we're using process.env to access our environment variables in production,
 * this approach does not expose any sensitive information to the public, which means
 * we can include this file in our repository. This is not the case for development.js.
 *
 * To learn how to setup enviroment variables on Heroku, visit:
 *
 * Remember, the api keys and information you use for these environment variables
 * should be different from the ones you use in development.
 *
 */
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN
};
