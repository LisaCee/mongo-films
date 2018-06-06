const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');


const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        const { gender, minheight } = req.query;
        const query = Character.find()

        if(gender !== undefined) {
            query.where({ gender: gender })
        }
        // if(minheight !== undefined) {
        //     query.gt({ height: minheight })
        // }

        query
            .then(characterObj => {
                res.status(200).json(characterObj);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The characters information could not be retrieved." });
            })
    });

    router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;

        Character.findById(id)
        .populate('homeworld', 'name')
        .then(character => {
            res.status(200).json(character);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The friend with the specified ID does not exist." });
        })
    });

    router
    .route('/:id/vehicle')
    .get((req, res) => {
        const { id } = req.params;
        
        Vehicle.find({ pilots: id })
        .then(pilots => {
            res.status(200).json(pilots);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The planets information could not be retrieved." });
        })
    });

module.exports = router;
