const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
// so here we go

router.get('/', (req, res) => {
    Film.find()
      .sort('-episode')
      .select('episode title planets characters')
      .populate('planets')
      .then( films => res.status(200).json(films))
})

module.exports = router;
