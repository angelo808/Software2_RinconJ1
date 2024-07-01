const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  occupation: {
    type: String,
    required: true
  },
  photo: String, // URL de la foto del usuario
  selectedAgency: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
