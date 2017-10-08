const mongoose = require('mongoose');
const { Schema } = mongoose;

// new model schema class
// takes an object containing the data (key/value pairs) 
// that should should be collected for each instance of the model
const userSchema = new Schema({
  googleId: String
})

/*!
 * instruct mongoose to create a collection in the database
 * based on a specifically defined model schema
 * the first argument is the name of the collection that 
 * instances of the model will be saved to in the database
 * the second argument is the model schema that should be used
 */
mongoose.model('users', userSchema);