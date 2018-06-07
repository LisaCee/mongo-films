const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const express = require('express');
const Film = require('./Film.js');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const { producer, released } = req.query;
    let query = Film.find().sort('episode')
      .populate('planets', 'climate name terrain gravity diameter -_id')
      .populate('characters', 'name gender height skin_color hair_color eye_color')

    if (producer !== undefined) {
      query.where({"producer": RegExp(producer, 'i')})
    }
    
    if (released !== undefined) {
      query.where({'release_date': RegExp(released, 'i')});
    }
    query
      .then(films => {
        res.status(200).json(films);
      })
      .catch(error => {
        res.sendStatus(404);
      })
  })

module.exports = router;
