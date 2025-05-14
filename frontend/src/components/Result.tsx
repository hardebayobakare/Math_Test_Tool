import React from 'react';

interface ResultProps {
  result: boolean;
  attempts: number;
  onNextQuestion: () => void;
}

const Result: React.FC<ResultProps> = ({ result, attempts, onNextQuestion }) => {
  const isError = !result;
  const attemptsLeft = 3 - attempts;

  return (
    <div
      className={`p-4 rounded-md shadow-md max-w-md mx-auto text-center ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}
    >
      <h3 className="text-xl font-semibold mb-2">
        {result ? '✅ Correct Loading next question...' : '❌ Incorrect, you have ' + attemptsLeft + ' attempts left'}
      </h3>
      {attempts >= 3 && (
        <p className="text-sm text-gray-600 mt-2">
          You've made 3 incorrect attempts.{' '}
          <button
            onClick={onNextQuestion}
            className="text-blue-600 hover:text-blue-800 underline cursor-pointer focus:outline-none"
          >
            Click here
          </button>{' '}
          to try another question.
        </p>
      )}
    </div>
  );
};

export default Result;
