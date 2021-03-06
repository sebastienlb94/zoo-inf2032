var configProject = require('../../config/project.js');
var express = require('express');
var router = express.Router();

var ZooManager = require('../managers/zooManager');
var Zoo = require('../models/zoo');
var Enclosure = require('../models/enclosure');

// Récupérer la liste de tous les zoos
router.get('/', function (req, res) {
  Zoo.find({}, (err, zoos) => {
    if (err) {
      res.status(500).end();
      return;
    }

    const serializedZoos = zoos.map(zoo => ZooManager.serializeZoo(zoo));
    res.status(200).send(serializedZoos);
  });
});

// Créer un nouveau zoo
router.post('/', function (req, res) {
  const zoo = {
    name: req.body.name,
    enclosures: []
  };

  Zoo.create(zoo, function (err, zoo) {
    if (err) {
      res.status(500).send(err);
    };

    const serializedZoo = ZooManager.serializeZoo(zoo);
    res.status(200).send(serializedZoo);
  });
});

// Récupérer le zoo avec l'id spécifié
router.get('/:zooId', function (req, res) {
  Zoo.findById(req.params.zooId, function (err, zoo) {
    if (err) {
      res.status(500).end();
      return;
    }

    const serializedZoo = ZooManager.serializeZoo(zoo);
    res.status(200).send(serializedZoo);
  });
});

// Modifier le zoo avec l'id spécifié
router.put('/:zooId', function (req, res) {
  Zoo.findById(req.params.zooId, function (err, zoo) {
    if (err) {
      res.status(500).end();
      return;
    }

    zoo.set({
      name: req.body.name
    });
    zoo.save((err, updatedZoo) => {
      if (err) {
        res.status(500).end();
        return;
      }

      const serializedZoo = ZooManager.serializeZoo(updatedZoo);
      res.status(200).send(serializedZoo);
    });
  });
});

// Ajouter un nouvel enclos
router.post('/:zooId', function (req, res) {
  Zoo.findById(req.params.zooId, function (err, zoo) {
    if (err) {
      res.status(500).end();
      return;
    }

    const enclosure = {
      name: req.body.name,
      animals: []
    };

    Enclosure.create(enclosure, function (err, enclosure) {
      if (err) {
        res.status(500).send(err);
      };

      const enclosures = zoo.enclosures;
      enclosures.push(enclosure);
      zoo.set({
        enclosures: enclosures
      });
      zoo.save((err, updatedZoo) => {
        if (err) {
          res.status(500).end();
          return;
        }

        const serializedZoo = ZooManager.serializeZoo(updatedZoo);
        res.status(200).send(serializedZoo);
      });
    });
  });
});

// Editer le nom d'un enclos
router.put('/:zooId/:enclosureId', function (req, res) {
  Zoo.findById(req.params.zooId, function (err, zoo) {
    if (err) {
      res.status(500).end();
      return;
    }

    const enclosure = zoo.enclosures.find(enclosure => enclosure.id === req.params.enclosureId);
    enclosure.name = req.body.enclosure.name;

    zoo.save((err, updatedZoo) => {
      const serializedZoo = ZooManager.serializeZoo(updatedZoo);
      res.status(200).send(serializedZoo);
    });
  });
});

// Supprimer un enclos
router.delete('/:zooId/:enclosureId', function (req, res) {
  Zoo.findById(req.params.zooId, function (err, zoo) {
    if (err) {
      res.status(500).end();
      return;
    }

    let enclosures = zoo.enclosures;
    enclosures = enclosures.filter(enclosure => enclosure._id != req.params.enclosureId);

    if (enclosures.length === zoo.enclosures.length) {
      res.status(404).end();
      return;
    }

    zoo.set({
      enclosures: enclosures
    });
    zoo.save((err, updatedZoo) => {
      if (err) {
        res.status(500).end();
        return;
      }

      const serializedZoo = ZooManager.serializeZoo(updatedZoo);
      res.status(200).send(serializedZoo);
    });
  });
});

// Ajouter un nouvel animal a l'enclos
router.post('/:zooId/:enclosureId', function (req, res) {
  // Trouve le zoo avec l'id demandé.
  Zoo.findById(req.params.zooId, function (err, zoo) {
    if (err) {
      res.status(500).end();
      return;
    }

    // Trouve l'enclos avec l'id demandé.
    const enclosure = zoo.enclosures.find(enclosure => enclosure.id === req.params.enclosureId);

    // Liste toutes les categories presente dans l'enclos. On regroupe dans un tableau toutes les categories de l'animal puis on applatie ce tableau et on supprime les doublons.
    const catogories = [...new Set(enclosure.animals.reduce((acc, animal) => acc.concat([animal.category_1, animal.category_2]), []))];

    // Gestion des imcompatibilités. Si les animaux n'ont pas les memes classes on ne peut pas les ajouter au zoo
    if (catogories.length > 0 && !(catogories.includes(req.body.animal.category_1) && catogories.includes(req.body.animal.category_2))) {
      // Renvoie une erreur d'imcompatibilité
      const serializedZoo = ZooManager.serializeZoo(zoo);
      res.status(403).send(serializedZoo);
      return;
    }

    // Ajoute l'animal a l'enclos.
    enclosure.animals = [...enclosure.animals, req.body.animal];

    // Sauvegarde le zoo avec le nouvel animal
    zoo.save((err, updatedZoo) => {
      const serializedZoo = ZooManager.serializeZoo(updatedZoo);
      res.status(200).send(serializedZoo);
    });
  });
});

// Supprimer un animal de l'enclos
router.delete('/:zooId/:enclosureId/:animalId', function (req, res) {
  Zoo.findById(req.params.zooId, function (err, zoo) {
    if (err) {
      res.status(500).end();
      return;
    }

    const enclosure = zoo.enclosures.find(enclosure => enclosure.id === req.params.enclosureId);
    enclosure.animals = enclosure.animals.filter(animal => animal.id != req.params.animalId);

    zoo.save((err, updatedZoo) => {
      const serializedZoo = ZooManager.serializeZoo(updatedZoo);
      res.status(200).send(serializedZoo);
    });
  });
});

module.exports = router;