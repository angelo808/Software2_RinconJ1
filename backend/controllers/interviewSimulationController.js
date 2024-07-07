const InterviewSimulation = require('../models/InterviewSimulation');

exports.createInterviewSimulation = async (req, res) => {
  const { user, questions } = req.body;

  if (!user || !questions || !questions.length) {
    return res.status(400).json({ message: 'User and questions are required' });
  }

  try {
    const totalScore = questions.reduce((acc, q) => acc + q.score, 0);
    const newSimulation = new InterviewSimulation({ user, questions, totalScore });
    await newSimulation.save();
    res.status(201).json(newSimulation);
  } catch (err) {
    console.error('Error creating interview simulation:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getInterviewSimulationResults = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const simulations = await InterviewSimulation.find({ user: userId });
      res.status(200).json(simulations);
    } catch (err) {
      console.error('Error fetching interview simulations:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
