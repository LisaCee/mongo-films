const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.route('/')
    .get((req, res) => {
        const { gender, minheight } = req.query
        const query = Character
            .find()
        if (gender !== undefined) {
            query.where({ gender: gender })
        }
        query.then(characters => {
            res.status(200).json(characters)
        })
            .catch(err => {
                res.sendStatus(500);
            })
    })

router.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Character
            .findById(id)
            .then(character => {
                if (character !== null) {
                    res.status(200).json(character);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })

module.exports = router;
