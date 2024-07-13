const express = require('express');
const router = express.Router();
const interviewSimulationController = require('../controllers/interviewSimulationController');

router.post('/', interviewSimulationController.createInterviewSimulation);
router.get('/:userId', interviewSimulationController.getInterviewSimulationResults);

module.exports = router;
