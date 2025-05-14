import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './components/Question';
import Result from './components/Result';

const App: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [studentAnswer, setStudentAnswer] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:5000/api/questions');
    setDataPoints(response.data.dataPoints);
    setResult(null);
    setStudentAnswer('');
    setAttempts(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/api/questions/check', {
      student: name,
      answer: studentAnswer,
      questionId: dataPoints[0].questionId
    });
    setResult(response.data.isCorrect);
    if (!response.data.isCorrect) {
      setAttempts(attempts + 1);
    } else {
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Line of Best Fit Challenge</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Question dataPoints={dataPoints} />
          <input
            type="text"
            placeholder="Your Answer (e.g., y=1.5x+0.3)"
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
        {result !== null && <Result result={result} attempts={attempts} />}
      </div>
    </div>
  );
};

export default App;
