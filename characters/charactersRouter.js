const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film')

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    Character.find()
        .then(characters => {
            res.status(200).json(characters);
        })
})
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Character.findById(id)
        .populate('homeworld', 'name')
        .then(character => {
            if (character) {
                Film.find({ characters: id })
                    .select('title -_id')
                    .then(films => {
                        res.status(200).json([character, films])
                    })
            } else {
                res.status(404).json({error: 'The character with that ID does not exist'})
            }
        })
        .catch(err => {
            res.sendStatus(500);
        })
})

module.exports = router;
