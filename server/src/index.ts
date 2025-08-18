import express from 'express';
import { Eval } from './models/eval';
import cors from 'cors';

const app = express();

app.use(cors());

app.listen(8085, () => {
  // Server started
});

app.get('/evals', (req, res) => {
  try {
    const evals = Eval.findAll();
    res.json(evals);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});
