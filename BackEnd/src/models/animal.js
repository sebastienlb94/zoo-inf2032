var mongoose = require('mongoose');

// define the schema for our animal model
var animalSchema = mongoose.Schema({
  name: String,
  class: String,
  imageUrl: String,
  category_1: String,
  category_2: String
});

// create the model for animals and expose it to our app
module.exports = mongoose.model('Animal', animalSchema);