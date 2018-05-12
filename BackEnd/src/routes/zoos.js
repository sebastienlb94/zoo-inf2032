var configProject = require('../../config/project.js');
var express = require('express');
var router = express.Router();

// Récupérer la liste de tous les zoos
router.get('/', function (req, res) {
    res.status(200).send('Liste de tous les zoos');
});

// Récupérer le zoo avec l'id spécifié
router.get('/:zooId', function (req, res) {
    res.status(200).send(`Zoo ${req.params.zooId}`);
});

module.exports = router;
