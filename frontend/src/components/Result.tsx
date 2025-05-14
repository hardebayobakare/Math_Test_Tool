import React from 'react';

interface ResultProps {
  result: boolean;
  attempts: number;
}

const Result: React.FC<ResultProps> = ({ result, attempts }) => {
  return (
    <div>
      <h3>{result ? 'Correct' : 'Incorrect'}</h3>
      {attempts >= 3 && <p>You've made 3 incorrect attempts. Please try again later.</p>}
    </div>
  );
};

export default Result;
