/*!
 * For details on mongoose and models, see the User.js file in the models folder.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  /*!
   * TODO: Explain - An array of another model
   */
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  /*!
   * TODO: Explain - Mongoose relationship reference
   * Property name can be anything but the underscore is common pratice to differentiate
   * ref: 'User' refers to the collection name in Mongoose
   */
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

module.exports = mongoose.model('survey', surveySchema);
