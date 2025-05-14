import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './components/Question';
import Result from './components/Result';

const App: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [studentAnswer, setStudentAnswer] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get('/api/questions');
    setDataPoints(response.data);
    setResult(null);
    setStudentAnswer('');
    setAttempts(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post('/api/questions/check', {
      name,
      answer: studentAnswer,
      coordinates: dataPoints
    });
    setResult(response.data.correct ? 'Correct!' : 'Incorrect!');
    if (!response.data.correct) {
      setAttempts(attempts + 1);
    } else {
      fetchData();
    }
  };

  return (
    <div>
      <h1>Line of Best Fit Challenge</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Question dataPoints={dataPoints} />
        <input
          type="text"
          placeholder="Your Answer (e.g., y=1.5x+0.3)"
          value={studentAnswer}
          onChange={(e) => setStudentAnswer(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {result && <Result result={result} attempts={attempts} />}
    </div>
  );
};

export default App;
