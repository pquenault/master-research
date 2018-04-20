var mongoose = require('mongoose');

// Create the schema.
var schoolSchema = new mongoose.Schema({
  name: {
    type: String
  },
  acronym: {
    type: String
  },
  postalCode: {
    type: String
  },
  city: {
    type: String
  },
  region: {
    type: String
  },
  country: {
    type: String
  }
});

// Export the model.
module.exports = mongoose.model('School', schoolSchema);
