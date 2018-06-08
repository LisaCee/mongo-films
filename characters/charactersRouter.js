const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film')
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    let { gender, minheight } = req.query;

    let query = Character.find()
    if (gender) {
        const genderFilter = new RegExp(gender, 'i');
        query.where({ gender: genderFilter })
    }
    if (minheight) {
        query.where('height').gt(minheight);
    }
    query.then(characters => {
        res.status(200).json(characters);
    })
        .catch(err => {
            res.sendStatus(500);
        })
})
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Character.findById(id)
        .populate('homeworld', 'name')
        .then(character => {
            if (character) {
                Film.find({ characters: id })
                    .select('title release_date episode -_id')
                    .then(films => {
                        res.status(200).json([character, films])
                    })
            } else {
                res.status(404).json({ error: 'The character with that ID does not exist' })
            }
        })
        .catch(err => {
            res.sendStatus(500);
        })
})

router.get('/:id/vehicles', (req, res) => {
    const { id } = req.params;

    let query = Character.findById(id)
        .then(character => {
            if (character) {
                Vehicle.find({ pilots: id })
                    .select('vehicle_class')
                    .then(vehicles => {
                        res.status(200).json([character, vehicles])
                    })
            }
        })
        .catch(err => {
            res.sendStatus(500);
        })
})


module.exports = router;
