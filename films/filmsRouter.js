const express = require('express');

const Film = require('./Film.js');
const Character = require('../characters/Character.js')

const router = express.Router();

router.get('/', (req, res) => {
    const { producer , released } = req.query
    if(producer!== undefined) {
        Film.find({ producer: {producer: producer } })
        .then((films) => {
            res.status(200).json(films)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
    } else if({released}) {
        Film.find({ released: released })
        .then((films) => {
            res.status(200).json(films)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
    } else {
        Film.find().sort( { episode: 1 } )
        .then((films) => {
            res.status(200).json(films)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
    }
})

// router.get(`/films`, (req, res) => {
//     console.log('query', req.query)
//     const { producer } = req.query
//         Film.find().where({producer: producer})
//         .then((films) => {
//             res.status(200).json(films)
//         })
//         .catch((error) => {
//             res.status(500).json(error)
//         })
// })

module.exports = router;
