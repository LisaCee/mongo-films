const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    const { gender, minheight } = req.query;
    const query = Character.find()
    if (gender !== undefined) {
        const filter = new RegExp(gender, 'i')
        query.where({ gender: filter })
    }
    if (minheight !== undefined) {
        query.find().where('height').gt(minheight)
    }
    query.then(chars => res.status(200).json(chars))
        .catch(err => {
            res.status(500).json(err)
        })
})

// router.route('/')
//     .get((req, res) => {
//         const { gender, minheight } = req.query
//         const query = Character
//             .find()
//         if (gender !== undefined) {
//             query.where({ gender: gender })
//         }
//         query.then(characters => {
//             res.status(200).json(characters)
//         })
//             .catch(err => {
//                 res.sendStatus(500);
//             })
//     })

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Character
        .findById(id)
        .populate('homeworld', 'name')
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

module.exports = router;
