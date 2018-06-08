const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle');
const Film = require('../films/Film');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    const { gender, minheight } = req.query;
    const query = Character.find()
    if (gender !== undefined) {
        const filter = new RegExp(gender, 'i')
        query.where({ gender: filter })
    }
    // if (minheight !== undefined) {
    //     query.find().where({ height: { $gte: minheight } })
    // } //empty array
    query.then(chars => res.status(200).json(chars))
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const movies = Film.find({ characters: id })
        .select('title episode')


    const char = Character.findById(id)  
        .populate('homeworld', 'name')  
    // Character
    //     .findById(id)
    Promise.all([movies, char])
        // .populate('homeworld', 'name')
        .then(character => {
            if (character !== null) {
                res.status(200).json(character);
            } else {
                res.status(404).json({ error: 'There is no character with that id' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})


// router.get('/:id/vehicles', (req, res) => {
//     const { id } = req.params;

//     let query = Character.find()
//         .populate('vehicles')
//         .where({ id: id })

//     // Vehicle.find({ pilots: id })
//     //     .then(pilots => {
//     //         if(pilots !== undefined) {
//     //             res.status(200).json(pilots)
//     //         } else {
//     //             res.status(404).json({message: 'The pilot with that ID does not exist'})
//     //         }
//     //     })
//     //     .catch(err => {
//     //         res.status(500).json(err)
//     //     })
// })

module.exports = router;
