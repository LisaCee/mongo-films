const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

router.get('/', (req, res) => {
    Vehicle.find()
    .then((vehicles) => {
        res.status(200).json(vehicles)
    })
})
module.exports = router;
