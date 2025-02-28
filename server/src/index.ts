import express from "express";
import { Eval } from "./models/eval";
import cors from "cors";

const app = express();

// Add cors middleware
app.use(cors());

app.listen(8085, () => {
  console.log("Server is running on port 8085");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/evals", async (req, res) => {
  try {
    const evals = await Eval.findAll();
    res.json(evals);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});
