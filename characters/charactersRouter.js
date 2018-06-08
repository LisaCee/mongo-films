const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');

const router = express.Router();

// add endpoints here


router.get("/", (req, res) => {
    Character.find()
    .then(characters => res.status(200).json(characters))
})

router.get("/:id", (req, res) => {
    let { id } = req.params;
    const charByID = Character.findById(id)
        .populate('homeworld')
        .select('name gender skin_color hair_color height eye_color birth_year')
    const movies = Film.where({ characters: id })
        .select('title producer director episode release_date')
    Promise.all([charByID, movies])
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ err: err.message }))
})

module.exports = router;
