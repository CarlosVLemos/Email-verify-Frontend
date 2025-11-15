
'use client';

import { useState } from 'react';
import { CHART_COLORS } from '@/lib/constants';
import { formatNumber } from '@/utils/formatters';

const BarChart = ({ data, title, maxValue }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        Sem dados disponíveis
      </div>
    );
  }

  const max = maxValue || Math.max(...data.map(item => item.count || item.value || 0));

  return (
    <div className="space-y-6">
      {title && (
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      )}

      <div className="space-y-4">
        {data.map((item, index) => {
          const value = item.count || item.value || 0;
          const percentage = (value / max) * 100;
          const color = item.category && CHART_COLORS[item.category] 
            ? CHART_COLORS[item.category]
            : { main: '#3b82f6', light: '#93c5fd', lightBg: '#dbeafe' };

          return (
            <div
              key={index}
              className="space-y-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.icon && <span className="text-xl">{item.icon}</span>}
                  <span className={`font-semibold transition-colors duration-300 ${
                    hoveredIndex === index
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {item.label || item.category || item.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-bold text-lg transition-all duration-300 ${
                    hoveredIndex === index
                      ? 'text-gray-900 dark:text-white scale-110'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {formatNumber(value)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-12 text-right">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>

              {}
              <div className="relative h-3 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: hoveredIndex === index ? color.light : color.main,
                    boxShadow: hoveredIndex === index ? `0 0 20px ${color.main}50` : 'none'
                  }}
                >
                  {}
                  <div
                    className="absolute top-0 left-0 h-full w-full opacity-30"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${color.light}, transparent)`,
                      animation: hoveredIndex === index ? 'shimmer 1.5s infinite' : 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {}
      <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Total
          </span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(data.reduce((sum, item) => sum + (item.count || item.value || 0), 0))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
