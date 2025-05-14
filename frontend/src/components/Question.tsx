import React from 'react';
import { DataPoint } from '../types/api';

interface QuestionProps {
  dataPoints: DataPoint[];
}

const Question: React.FC<QuestionProps> = ({ dataPoints = [] }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Points:</h2>
      <ul className="space-y-1">
        {dataPoints?.map((point, index) => (
          <li
            key={index}
            className="text-gray-700 bg-gray-100 px-3 py-1 rounded border border-gray-200"
          >
            ({point.x}, {point.y})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
