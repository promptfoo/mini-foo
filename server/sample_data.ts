export const evals = [
  {
    id: 1,
    name: "Eval 1",
  },
  {
    id: 2,
    name: "Eval 2",
  },
];

export const evalResults = [
  {
    id: 1,
    evalId: 1,
    input: "What is the capital of France?",
    output: "Paris",
    passed: true,
  },
  {
    id: 2,
    evalId: 1,
    input: "What is the capital of Germany?",
    output: "Sydney",
    passed: false,
  },
  {
    id: 3,
    evalId: 2,
    input: "What sounds does a dog make?",
    output: "Woof woof",
    passed: true,
  },
  {
    id: 4,
    evalId: 2,
    input: "What sounds does a cat make?",
    output: "Moo moo",
    passed: false,
  },
];
