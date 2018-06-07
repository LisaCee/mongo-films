const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
// so here we go

router.get('/', (req, res) => {
    Film.find()
      .sort('-episode')
      .select('episode title planets characters')
      .populate('planets', 'name climate terrain gravity diameter -_id')
      .populate('characters', 'name')
      .then( films => res.status(200).json(films))
      .catch( err => res.sendStatus(500))
})

module.exports = router;
