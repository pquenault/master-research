var mongoose = require('mongoose');

// Create the schema.
var formerStudentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  surname: {
    type: String
  },
  email: {
    type: String
  },
  graduation: {
    type: String
  },
  curriculum: {
    type: String
  },
  distinction: {
    type: String
  },
  hasDone: [{
    start: {
      type: String
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    status: {
      type: String
    }
  }]
});

// Export the model.
module.exports = mongoose.model('FormerStudent', formerStudentSchema);
