import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.svg';

interface EvalResult {
  id: number;
  evalId: number;
  input: string;
  output: string;
  passed: boolean;
}

interface Eval {
  id: number;
  name: string;
  results: EvalResult[];
}

function App() {
  const [evals, setEvals] = useState<Eval[]>([]);
  const [selectedEval, setSelectedEval] = useState<Eval | null>(null);

  // Fetch evals when component mounts
  useEffect(() => {
    const fetchEvals = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/evals`);
        const data = await response.json();
        setEvals(data);
        if (data.length > 0) {
          setSelectedEval(data[0]); // Select first eval by default
        }
      } catch {
        // Handle error silently
      }
    };

    fetchEvals();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Evaluation Results</h1>
          <select
            value={selectedEval?.id || ''}
            onChange={(e) => {
              const selected = evals.find(
                (evalItem) => evalItem.id === Number(e.target.value)
              );
              setSelectedEval(selected || null);
            }}
            className="eval-select"
          >
            <option value="">Choose an evaluation...</option>
            {evals.map((evalItem) => (
              <option key={evalItem.id} value={evalItem.id}>
                {evalItem.name}
              </option>
            ))}
          </select>
        </header>

        {selectedEval && (
          <div className="results-container">
            <h2>{selectedEval.name}</h2>
            <table className="results-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Input</th>
                  <th>Output</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedEval.results.map((result) => (
                  <tr key={result.id}>
                    <td>#{result.id}</td>
                    <td>
                      <code>{result.input}</code>
                    </td>
                    <td>
                      <code>{result.output}</code>
                    </td>
                    <td>
                      <span
                        className={`status ${result.passed ? 'passed' : 'failed'}`}
                      >
                        {result.passed ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
