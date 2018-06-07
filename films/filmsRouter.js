const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    const { producer, released } = req.query;

    let query = Film.find()
        .sort('episode')
        .select('episode title planets characters producer release_date')
        .populate('planets', 'name climate terrain gravity diameter -_id')
        .populate('characters', 'name gender height skin_color hair_color eye_color')
    if (producer !== undefined) {
        const filter = new RegExp(producer, 'i')
        query.where({ producer: filter })
    }
    if (released !== undefined) {
        query.where({ release_date: { $regex: released, $options: 'i' } })
    }
    query.then(films => res.status(200).json(films))
        .catch(err => res.status(500).json(err))
})


module.exports = router;
