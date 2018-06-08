const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    let { producer, released } = req.query;
    let query = Film.find()
        .sort('episode')
        .select('title episode -_id release_date producer')
        .populate('characters', '_id name gender height skin_color hair_color eye_color')
        .populate('planets', 'name climate terrain gravity diameter')
    if (producer) {
        const producerFilter = new RegExp(producer, 'i')
        query.where({ producer: producerFilter })
    }
    if (released) {
        query.where({ release_date: { $regex: released } })
    }
    query.then(films => {
        res.status(200).json(films)
    })
        .catch(err => {
            res.sendStatus(500);
        })
})

module.exports = router;
