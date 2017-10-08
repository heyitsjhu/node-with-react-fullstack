/*! module.exports
 * lets you expose anything that's assigned to it so
 * that it can be used elsewhere in an application
 * here, we are exposing an object of key/value pairings,
 * which we can then be imported elsewhere using the 
 * require() method and passing in the relative path to this file
 */
module.exports = {
  /*!
   * declare sensitive information that should not be public, 
   * such as api keys and secrets, here as key/value pairings
   * note: make sure to add this file to .gitignore to ensure
   * the information stored here is not pushed to your remote
   * repository, such as github
   */
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
}