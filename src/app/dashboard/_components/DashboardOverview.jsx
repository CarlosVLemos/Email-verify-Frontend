import React from 'react';

const DashboardOverview = ({ metrics }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold text-gray-800">Visão Geral</h3>
      <ul className="mt-2 space-y-2">
        {metrics.map((metric, index) => (
          <li key={index} className="text-sm text-gray-600">
            <strong>{metric.label}:</strong> {metric.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardOverview;