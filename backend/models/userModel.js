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
    entrevista: { 
        type: Boolean, 
        default: false 
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    employer: {
        type: String,
        default: null
    },
    job: {
        type: String,
        default: null
    },
    blocked: {
        type: Boolean,
        default: false
    },
    documents: {
        ds160: {
            url: {
                type: String,
                default: null
            },
            approved: {
                type: Boolean,
                default: false
            }
        },
        payment: {
            url: {
                type: String,
                default: null
            },
            approved: {
                type: Boolean,
                default: false
            }
        },
        passport: {
            url: {
                type: String,
                default: null
            },
            approved: {
                type: Boolean,
                default: false
            }
        },
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;