const express = require('express');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  return res.json({ status: 'ok' });
});

app.post('/candidates/validate', (req, res) => {
  const { score } = req.body || {};
  let normalizedScore;

  if (score === undefined || score === null) {
    normalizedScore = 0;
  } else if (typeof score === 'number') {
    normalizedScore = score;
  } else if (typeof score === 'string' && score.trim() !== '') {
    normalizedScore = Number(score);
  } else {
    return res.status(400).json({ error: 'Invalid score' });
  }

  if (!Number.isFinite(normalizedScore) || normalizedScore < 0 || normalizedScore > 100) {
    return res.status(400).json({ error: 'Invalid score' });
  }

  return res.json({
    status: normalizedScore < 90 ? 'manual_review' : 'approved'
  });
});

module.exports = app;
