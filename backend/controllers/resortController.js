const Resort = require('../models/resortModel');

exports.getResorts = async (req, res) => {
    try {
        const resorts = await Resort.find();
        res.status(200).json(resorts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.createResort = async (req, res) => {
    try {
        const { name, jobs } = req.body;
        const newResort = new Resort({
            name,
            jobs
        });
        await newResort.save();
        res.status(201).json(newResort);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};