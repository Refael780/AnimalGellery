const express = require('express');
const router = express.Router();
const Animal = require('../Models/Animal');
const mongoose = require('mongoose');

// @route   GET api/animals
// @desc    get all animals
// @access  Public
router.get('/', async (req, res) => {
  try {
    const Animals = await Animal.find().catch(err => {
      return res.status(500).json('Server Error ' + { msg: err });
    });
    return res.json(Animals);
  } catch (error) {
    return res.status(500).json('Server Error ' + { msg: error });
  }
});

// @route   POST api/animals
// @desc    add animal and return  updated animals list
// @access  Public
router.post('/', async (req, res) => {
  const animal = new Animal({
    ...req.body.animal
  });
  animal.save(async function(err) {
    if (err) {
      return res.json('Server Error ' + { msg: err });
    }
  });

  try {
  } catch (error) {
    console.log(error);
    
  }
  return res.send('Create Animal ');
});

// @route   GET api/animals
// @desc    get all animals
// @access  Public
router.get('/:animalId', async (req, res) => {
  return res.send('Get spesfic Animal ');
});
// @route   POST api/animals
// @desc    modify animal
// @access  Public
router.put('/:animalId', async (req, res) => {
  const filter = { _id: req.params.animalId };
  const update = { ...req.body.animal };
  try {
    let doc = await Animal.findOneAndUpdate(filter, update).catch(err => {
      return res.status(500).json('Server Error ' + { msg: err });
    });
    return res.json('Success');

  } catch (error) {
    
  }      return res.status(500).json('Server Error ' + { msg: error });

  // `doc` is the document _before_ `update` was applied

});

// @route   delete api/animals
// @desc    delete animal
// @access  Public
router.delete('/:animalId', async (req, res) => {
  const { animalId } = req.params;
  try {
    await  Animal.findByIdAndRemove(
      { _id: animalId },
       function(err, data) {
        if (!err) {
          console.log("Animal deleted");
        } else {
              console.log(err);

          return res.json('Server Error ' + { msg: err });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.json('Server Error ' + { msg: error });

  }
  res.json("Animal deleted");


});

module.exports = router;
