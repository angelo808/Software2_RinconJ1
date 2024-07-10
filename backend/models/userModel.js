
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    photo: {
        type: String, // Almacena la URL de la foto del usuario
        default: null
    },
    selectedAgency: {
        type: String,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    test: {
        type: String,
        default: null
    },
    ds: {
        type: String,
        default: null
    },
    pago: {
        type: String,
        default: null
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;