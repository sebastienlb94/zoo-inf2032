var configProject = require('../../config/project.js');
var express = require('express');
var router = express.Router();

var AnimalManager = require('../managers/animalManager');
var Animal = require('../models/animal');

// Récupérer la liste de tous les animaux
router.get('/', function (req, res) {
  Animal.find({}, (err, animals) => {
    if (err) {
        res.status(500).end();
        return;
    }

    serializedAnimals = animals.map(animal => AnimalManager.serializeAnimal(animal));
    res.status(200).send(serializedAnimals);
  });
});

// Créer un nouvel animal
router.post('/', function (req, res) {
  const animal = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    class: req.body.class,
  };

  Animal.create(animal, function (err, animal) {
    if (err) {
      res.status(500).send(err);
    };

    serializedAnimal = AnimalManager.serializeAnimal(animal)
    res.status(200).send(serializedAnimal);
  });
});

// Récupérer un animal à partir de son ID
router.get('/:id', function (req, res) {
  res.status(404).send('TODO');
});

// Modifie un animal à partir de son ID
router.get('/:id', function (req, res) {
  res.status(404).send('TODO');
});

// Supprimer un animal à partir de son ID
router.delete('/:id', function (req, res) {
  res.status(404).send('TODO');
});

module.exports = router;
