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
  googleClientID: '626544155802-3i1uri38ks0868mo0fhbg159qv64ff5g.apps.googleusercontent.com',
  googleClientSecret: 'PzAhzTnBIARfwdoCzhENaNlM',
  mongoURI: 'mongodb://dl-admin:H9qzR2DS3md9kYsF@ds111535.mlab.com:11535/node-react-fullstack',
  cookieKey: '234jkvi043kogfdID8dDJGSdf2'
}