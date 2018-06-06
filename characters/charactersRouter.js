const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.route('/')
    .get((req, res) => {
        Character
            .find()
            .then(characters => {
                res.status(200).json(characters)
            })
            .catch(err => {
                res.sendStatus(500);
            })
    })

router.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        console.log('ID', id)
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
