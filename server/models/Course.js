var mongoose = require('mongoose');

// Create the schema.
var courseSchema = new mongoose.Schema({
  name: {
    type: String
  },
  acronym: {
    type: String
  },
  kind: {
    type: String
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School'
  }
});

// Export the model.
module.exports = mongoose.model('Course', courseSchema);
