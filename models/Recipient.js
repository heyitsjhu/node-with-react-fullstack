/*!
 * For details on mongoose and models, see the User.js file in the models folder.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

/*!
 * TODO: Explain Mongoose sub-document model and how this is 
 * used in the Survey model, instead of being exported as a Mongoose model.
 */
module.exports = recipientSchema;
