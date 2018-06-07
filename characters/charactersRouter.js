const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const express = require('express');
const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const { minheight } = req.query;
    let query = Character.find().sort('name')

    if (minheight) {
      query.find({ gender: 'female' }).where('height').gt(minheight)
    }
    query
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(error => {
        res.sendStatus(500);
      })
  })

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;

    const movies = Film.find()
      .where({ characters: id })
      .select("title episode director producer release_date")
      .sort('episode')
    
    const character = Character.find()
      .where({"_id": id})
      .populate('homeworld')

    Promise.all([ movies, character ])
      .then(results => {
        const [ movies, character ] = results;
        res.status(200).json({ character, movies })
      })
  })

router.route('/:id/vehicles')
  .get((req, res) => {
    const { id } = req.params;

    Vehicle.find().where({ pilots: id }).select('vehicle_class -_id')
      .then(vehicles => {
        res.status(200).json(vehicles);
      })
      .catch(error => {
        res.sendStatus(500);
      })
  })

module.exports = router;
