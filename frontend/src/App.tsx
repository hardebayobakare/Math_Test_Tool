import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './components/Question';
import Result from './components/Result';
import { DataPoint, QuestionResponse, AnswerResponse, SubmitAnswerRequest } from './types/api';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

function App() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [studentName, setStudentName] = useState('');
  const [studentAnswer, setStudentAnswer] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get<QuestionResponse>(`${backendUrl}/api/questions`);
    setDataPoints(response.data.dataPoints);
    setCorrectAnswer(response.data.equation);
    setResult(null);
    setStudentAnswer('');
    setAttempts(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentAnswer.trim()) return;

    const requestData: SubmitAnswerRequest = {
      studentName,
      answer: studentAnswer
    };

    try {
      const response = await axios.post<AnswerResponse>(
        `${backendUrl}/api/check`,
        requestData
      );
      setResult(response.data.result);
      if (!response.data.result) {
        setAttempts(prev => prev + 1);
      } else {
        setTimeout(fetchData, 2000);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Line of Best Fit Challenge
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Your Name"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Question dataPoints={dataPoints} />
          <input
            type="text"
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            placeholder="Your Answer (e.g., y=1.5x+0.3)"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        {result !== null && (
          <Result
            result={result}
            attempts={attempts}
            onNextQuestion={fetchData}
            correctAnswer={correctAnswer}
          />
        )}
      </div>
    </div>
  );
}

export default App;
