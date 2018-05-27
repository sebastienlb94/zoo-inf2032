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

        zoo.set({ name: req.body.name });
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
            enclosures: []
        };
    
        Enclosure.create(enclosure, function (err, enclosure) {
            if (err) {
                res.status(500).send(err);
            };

            const enclosures = zoo.enclosures;
            enclosures.push(enclosure);
            zoo.set({ enclosures: enclosures });
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

        zoo.set({ enclosures: enclosures });
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

module.exports = router;
