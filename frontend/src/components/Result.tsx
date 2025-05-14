import React from 'react';

interface ResultProps {
  result: string;
  attempts: number;
}

const Result: React.FC<ResultProps> = ({ result, attempts }) => {
  return (
    <div>
      <h3>{result}</h3>
      {attempts >= 3 && <p>You've made 3 incorrect attempts. Please try again later.</p>}
    </div>
  );
};

export default Result;
