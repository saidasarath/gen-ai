import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PerformanceChartProps {
  period: 'week' | 'month' | 'year';
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ period }) => {
  // Mock data - in real app, this would come from props or API
  const data = [
    { name: 'Week 1', hr: 70, technical: 65, aptitude: 80 },
    { name: 'Week 2', hr: 75, technical: 70, aptitude: 82 },
    { name: 'Week 3', hr: 82, technical: 78, aptitude: 85 },
    { name: 'Week 4', hr: 85, technical: 82, aptitude: 88 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="name" className="text-sm text-gray-600" />
          <YAxis className="text-sm text-gray-600" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="hr"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            name="HR Round"
          />
          <Line
            type="monotone"
            dataKey="technical"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
            name="Technical"
          />
          <Line
            type="monotone"
            dataKey="aptitude"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            name="Aptitude"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};