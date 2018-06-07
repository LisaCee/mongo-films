const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    Character.find()
        .then(chars => res.status(200).json(chars))
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Character.findById(id)
        .populate('homeworld', 'name climate')
        .select('name height birth_year')
        .then(char => res.status(200).json(char))
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

// router.route('/:id')
//     .get((req, res) => {
//         const { id } = req.params;
//         Character
//             .findById(id)
//             .then(character => {
//                 if (character !== null) {
//                     res.status(200).json(character);
//                 } else {
//                     res.sendStatus(404);
//                 }
//             })
//             .catch(err => {
//                 res.status(500).json(err);
//             })
//     })

module.exports = router;
