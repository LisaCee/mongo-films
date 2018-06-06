const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const express = require('express');
const Film = require('./Film.js');

const router = express.Router();

router.route('/')
  .get()
  .post()

router.route('/:id')
  .get()
  .put()
  .delete()

module.exports = router;
