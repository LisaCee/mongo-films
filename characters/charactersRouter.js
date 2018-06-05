const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Character.find()
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
        .then(character => {
            res.status(200).json(character);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The friend with the specified ID does not exist." });
        })
    });

module.exports = router;
