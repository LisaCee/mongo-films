const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.route('/')
    .get((req, res) => {
        let query = Film
            .find()
            query.sort('episode')
    
            .select('_id name gender height skin_color hair_color eye_color')
            .then(films => {
                res.status(200).json(films)
            })
            .catch(err => {
                res.sendStatus(500);
            })
    })

module.exports = router;
