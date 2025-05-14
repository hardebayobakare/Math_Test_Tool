import React from 'react';

interface QuestionProps {
  dataPoints: any[];
}

const Question: React.FC<QuestionProps> = ({ dataPoints }) => {
  return (
    <div>
      <h2>Data Points:</h2>
      <ul>
        {dataPoints.map((point, index) => (
          <li key={index}>({point.x}, {point.y})</li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
