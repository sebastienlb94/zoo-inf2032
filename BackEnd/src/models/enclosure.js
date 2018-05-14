var mongoose = require('mongoose');
var Animal = require('./animal');

var enclosureSchema = mongoose.Schema({
    name: String,
    animals: [Animal],
    creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Enclosure', enclosureSchema);