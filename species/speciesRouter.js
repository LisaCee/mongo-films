const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router.route('/')
    .get((req, res) => {
        Specie
            .find()
            .then(specie => {
                res.status(200).json(specie);
            })
            .catch(err => {
                res.sendStatus(500);
            })
    })

module.exports = router;
