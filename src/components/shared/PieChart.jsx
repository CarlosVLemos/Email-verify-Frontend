
'use client';

import { useState } from 'react';
import { CHART_COLORS } from '@/lib/constants';

const PieChart = ({ data, title }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!data || !data.categories || data.categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        Sem dados disponíveis
      </div>
    );
  }

  const total = data.categories.reduce((sum, item) => sum + item.count, 0);
  
  
  let currentAngle = 0;
  const slices = data.categories.map((item, index) => {
    const percentage = (item.count / total) * 100;
    const angle = (item.count / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    return {
      ...item,
      percentage,
      angle,
      startAngle,
      endAngle: currentAngle,
      color: CHART_COLORS[item.category]
    };
  });

  
  const createSlicePath = (startAngle, endAngle, radius = 100, innerRadius = 0) => {
    const start = polarToCartesian(150, 150, radius, endAngle);
    const end = polarToCartesian(150, 150, radius, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

    if (innerRadius > 0) {
      
      const innerStart = polarToCartesian(150, 150, innerRadius, endAngle);
      const innerEnd = polarToCartesian(150, 150, innerRadius, startAngle);
      
      return [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArc, 0, end.x, end.y,
        'L', innerEnd.x, innerEnd.y,
        'A', innerRadius, innerRadius, 0, largeArc, 1, innerStart.x, innerStart.y,
        'Z'
      ].join(' ');
    }

    return [
      'M', 150, 150,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArc, 0, end.x, end.y,
      'Z'
    ].join(' ');
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  return (
    <div className="space-y-6">
      {title && (
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      )}

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {}
        <div className="relative">
          <svg width="300" height="300" viewBox="0 0 300 300" className="transform -rotate-90">
            {slices.map((slice, index) => (
              <g key={index}>
                <path
                  d={createSlicePath(slice.startAngle, slice.endAngle, 100, 40)}
                  fill={hoveredIndex === index ? slice.color.light : slice.color.main}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    filter: hoveredIndex === index ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' : 'none',
                    transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: '150px 150px'
                  }}
                />
              </g>
            ))}
          </svg>
          
          {}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {total}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total
            </div>
          </div>
        </div>

        {}
        <div className="flex-1 space-y-3 w-full">
          {slices.map((slice, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                hoveredIndex === index
                  ? 'bg-gray-100 dark:bg-dark-700 scale-105'
                  : 'bg-gray-50 dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: slice.color.main }}
                />
                <span className="font-medium text-gray-800 dark:text-white">
                  {slice.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {slice.count}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {slice.percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
