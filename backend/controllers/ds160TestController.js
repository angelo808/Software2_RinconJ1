const DS160Test = require('../models/DS160Test');

exports.createDS160Test = async (req, res) => {
  const { user, questions } = req.body;

  if (!user || !questions || !questions.length) {
    return res.status(400).json({ message: 'User and questions are required' });
  }

  try {
    const totalScore = questions.reduce((acc, q) => acc + q.score, 0);
    const newTest = new DS160Test({ user, questions, totalScore });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    console.error('Error creating DS-160 test:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getDS160TestResults = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const tests = await DS160Test.find({ user: userId });
      res.status(200).json(tests);
    } catch (err) {
      console.error('Error fetching DS-160 tests:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
