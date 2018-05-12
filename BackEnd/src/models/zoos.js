var mongoose = require('mongoose');

var zooSchema = mongoose.Schema({
    name: String,
    enclosures: String,
});

module.exports = mongoose.model('Zoo', zooSchema);