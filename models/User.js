const mongoose = require('mongoose');

/*! - destructuring assignment
 * The following syntax is known as destructuring assignment and makes it possible
 * to unpack values from arrays or, in this case, properties from objects. The Schema
 * property inside of the mongoose module is unpacked and assigned to a variable of
 * the same name within the application.
 */
const { Schema } = mongoose;

/*! - mongoose schema
 * Everything in mongoose begins with a Schema. A schema maps to a MongoDB collection,
 * or database table, and defines the data structure within that collection.
 * Here, a new schema is created via the new keyword and assigned to a variable.
 * An JS object is passed into the Schema function: each key defines a property in the
 * table, while the value represents the SchemaType that it will be cast to. Key's may
 * also be assigned nested objects containing further key/type definitions.
 * Permitted SchemaTypes are:
 *   String
 *   Number
 *   Date
 *   Buffer
 *   Boolean
 *   Mixed
 *   ObjectId
 *   Array
 *
 * To learn more about mongoose's Schema, visit: http://mongoosejs.com/docs/guide.html
 * And for more on SchemaTypes: http://mongoosejs.com/docs/schematypes.html
 */
const userSchema = new Schema({
  /*!
   * To learn more about the available data from Google's API, visit:
   */
  googleId: String
})

/*! - mongoose model
 * Defining a schema is just the first step in managing a database in the application.
 * The actual creation and retrieval of data from the database is handled by models.
 * Mongoose's model() method does just that. The first argument is the singular name of
 * the collection a specific model is for. For example, if you have a users collection,
 * the first argument would be user. Mongoose will automatically look for the plural
 * version of the specified model name. The second argument is the schema, which the method
 * makes a copy of. So, make sure you've added everything you want to the schema beforehand!
 *
 * To learn more about mongoose's model, visit: http://mongoosejs.com/docs/models.html
 */
mongoose.model('user', userSchema);