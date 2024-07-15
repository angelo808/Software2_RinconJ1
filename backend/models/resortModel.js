const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

const ResortSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    jobs: [JobSchema]
});

const Resort = mongoose.model('Resort', ResortSchema);

module.exports = Resort;