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

    const serializedAnimals = animals.map(animal => AnimalManager.serializeAnimal(animal));
    res.status(200).send(serializedAnimals);
  });
});

// Importer une liste nouveaux animaux
router.post('/import', function (req, res) {
  const animals = JSON.parse(req.body.animals).animals;

  for (var i = 0, length = animals.length; i < length; i++) {
    const animal = animals[i];

    Animal.create(animal, function (err, animal) {
      if (err) {
        res.status(500).send(err);
      };
    });
  }

  res.status(200).send("Imported");
});

// Créer un nouvel animal
router.post('/', function (req, res) {
  const animal = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    class: req.body.class,
    category_1: req.body.category_1,
    category_2: req.body.category_2
  };

  Animal.create(animal, function (err, animal) {
    if (err) {
      res.status(500).send(err);
    };

    const serializedAnimal = AnimalManager.serializeAnimal(animal);
    res.status(200).send(serializedAnimal);
  });
});

// Récupérer un animal à partir de son ID
router.get('/:id', function (req, res) {
  Animal.findById(req.params.id, function (err, animal) {
    if (err) {
        res.status(500).end();
        return;
    }

    const serializedAnimal = AnimalManager.serializeAnimal(animal);
    res.status(200).send(serializedAnimal);
  });
});

// Modifie un animal à partir de son ID
router.put('/:id', function (req, res) {
  res.status(401).send('TODO');
});

// Supprimer un animal à partir de son ID
router.delete('/:id', function (req, res) {
  res.status(401).send('TODO');
});

module.exports = router;
