var configProject = require('../../config/project.js');
var express = require('express');
var router = express.Router();

var Animal = require('../models/animal');

// Récupérer la liste de tous les animaux
router.get('/', function (req, res) {
  Animal.find({}, (err, animals) => {
    if (err) {
        res.status(500).end();
        return;
    }

    res.status(200).send(animals);
  });
});

// Créer un nouvel animal
router.post('/', function (req, res) {
  Animal.create({ name: req.body.name }, function (err, animal) {
    if (err) {
      res.status(500).send(err);
    };

    res.status(200).send(animal);
  });
});

// Récupérer un animal à partir de son ID
router.get('/:id', function (req, res) {
  res.status(200).send('TODO');
});

// Modifie un animal à partir de son ID
router.get('/:id', function (req, res) {
  res.status(200).send('TODO');
});

// Supprimer un animal à partir de son ID
router.delete('/:id', function (req, res) {
  res.status(200).send('TODO');
});

module.exports = router;
