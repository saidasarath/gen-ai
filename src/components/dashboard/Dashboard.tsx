import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatsCard } from './StatsCard';
import { PerformanceChart } from './PerformanceChart';
import { RecentSessions } from './RecentSessions';
import { InterviewSelector } from './InterviewSelector';
import { BarChart3, TrendingUp, Clock, Award } from 'lucide-react';
import { mockSessionResults } from '../../lib/mockData';
import { InterviewType } from '../../types';

interface DashboardProps {
  onStartInterview: (type: InterviewType) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartInterview }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Calculate dashboard stats
  const totalSessions = mockSessionResults.length;
  const averageScore = mockSessionResults.reduce((acc, session) => acc + session.averageScore, 0) / totalSessions;
  const totalTime = mockSessionResults.reduce((acc, session) => acc + session.totalTime, 0);
  const completedQuestions = mockSessionResults.reduce((acc, session) => acc + session.completedQuestions, 0);

  const stats = [
    {
      title: 'Average Score',
      value: `${averageScore.toFixed(1)}%`,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Sessions Completed',
      value: totalSessions.toString(),
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Questions Answered',
      value: completedQuestions.toString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Time Practiced',
      value: `${Math.floor(totalTime / 3600)}h ${Math.floor((totalTime % 3600) / 60)}m`,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Track your interview preparation progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Start New Interview */}
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Start New Interview Session
          </h3>
          <InterviewSelector onSelect={onStartInterview} />
        </Card>

        {/* Quick Stats */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Overview
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">HR Rounds</span>
              <span className="font-medium">82% avg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Technical</span>
              <span className="font-medium">78% avg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Aptitude</span>
              <span className="font-medium">88% avg</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Chart */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Performance Trends
            </h3>
            <div className="flex space-x-2">
              {['week', 'month', 'year'].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period as 'week' | 'month' | 'year')}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <PerformanceChart period={selectedPeriod} />
        </Card>

        {/* Recent Sessions */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Sessions
          </h3>
          <RecentSessions sessions={mockSessionResults} />
        </Card>
      </div>
    </div>
  );
};