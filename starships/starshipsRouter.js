const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    Starship.find()
        .then(ship => {
            res.status(200).json((ship))
        })
        .catch(err => {
            res.sendStatus(500);
        })
})

module.exports = router;
