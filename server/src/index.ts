import express from 'express';
import { Eval } from './models/eval';
import cors from 'cors';

const app = express();

app.use(cors());

app.listen(8085, () => {
  console.log('Server started on port 8085');
});

app.get('/evals', (req, res) => {
  try {
    const evals = Eval.findAll();
    res.json(evals);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});
