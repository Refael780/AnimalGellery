const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  familyType: {
    type: String
  },
  isPreditor: {
    type: String
  },
  description: {
    type: String
  },
  lifeTime: {
    type: String
  },
  imgUrl: {
    type: String
  }
});

module.exports = Animal = mongoose.model('animal', AnimalSchema);
