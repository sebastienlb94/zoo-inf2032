var mongoose = require('mongoose');
var Enclosure = require('./enclosure');

var zooSchema = mongoose.Schema({
    name: String,
    enclosures: [Enclosure],
    creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Zoo', zooSchema);