import React from 'react';

interface ResultProps {
  result: boolean;
  attempts: number;
  onNextQuestion: () => void;
  correctAnswer: string;
}

const Result: React.FC<ResultProps> = ({ result, attempts, onNextQuestion, correctAnswer }) => {
  const isError = !result;
  const attemptsLeft = 3 - attempts;

  return (
    <div
      className={`mt-6 p-4 rounded-md shadow-md max-w-md mx-auto text-center ${
        isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
      }`}
    >
      <h3 className="text-xl font-semibold mb-2">
        {result ? '✅ Correct Loading next question...' : '❌ Incorrect, you have ' + attemptsLeft + ' attempts left'}
      </h3>
      {attempts >= 3 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-700 mb-2">You've made 3 incorrect attempts.</p>
          <p className="text-gray-800 font-medium mb-3">
            The correct answer is: <span className="text-indigo-600">{correctAnswer}</span>
          </p>
          <button
            onClick={onNextQuestion}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span>Try Another Question</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Result;
