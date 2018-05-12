var httpContext = require('express-http-context');

module.exports = function (app) {
    app.use('/zoos', require('./zoos.js'));
    app.use('/animals', require('./animals.js'));
}