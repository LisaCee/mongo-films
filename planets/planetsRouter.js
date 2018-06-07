const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const express = require('express');
const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Specie = require('../species/Specie.js');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    Planet.find()
      .then(planets => {
        res.status(200).json(planets)
      })
  })
router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;

    const characters = Character.find({ homeworld: id })
    const species = Specie.find({ homeworld: id })

    Promise.all([ characters, species ])
      .then(results => {
        const [ characters, species ] = results;
        res.status(200).json({ characters, species })
      })
      .catch(error => {
        res.sendStatus(500);
      })
  })


module.exports = router;
