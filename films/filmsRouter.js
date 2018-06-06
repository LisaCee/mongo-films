const mongoose = require('mongoose');
const express = require('express');
const ObjectId = mongoose.Schema.Types.objectId;


const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router.route('/')
.get((req, res) => {
    let query = Film.find()
    query.sort('episode')
    .then(films => {
        res.status().json(films)
    })
    .catch(error => {
        res.status(500).json({error: 'Error returning information from database' })
    })
})



module.exports = router;
