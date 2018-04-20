var mongoose = require('mongoose');

// Create the FormationSchema.
var FormationSchema = new mongoose.Schema({
  id_formation: String,
  intitule_form: String,
  sigle_form: String,
  type_form: String,
  fk_id_specialite_form: String,
  fk_id_etablissement_form: String
}, {collection: 'formation'});

// Export the model.
module.exports = mongoose.model('formation', FormationSchema);
