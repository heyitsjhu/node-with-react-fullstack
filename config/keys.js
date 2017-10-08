/*! module.exports
 * lets you expose anything that's assigned to it so
 * that it can be used elsewhere in an application
 * here, we are exposing an object of key/value pairings,
 * which we can then be imported elsewhere using the 
 * require() method and passing in the relative path to this file
 */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}