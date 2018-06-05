const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Planet.find()
        .then(planetObj => {
            res.status(200).json(planetObj);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The planets information could not be retrieved." });
        })
    });

module.exports = router;
