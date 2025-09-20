import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ArrowLeft, Download, Share2, Award, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { InterviewType } from '../../types';
import { INTERVIEW_TYPES } from '../../lib/constants';
import { formatDistance } from 'date-fns';

interface SessionResultsProps {
  results: any; // Replace with proper type
  onBackToDashboard: () => void;
}

export const SessionResults: React.FC<SessionResultsProps> = ({
  results,
  onBackToDashboard,
}) => {
  const {
    type,
    averageScore,
    totalTime,
    completedQuestions,
    totalQuestions,
    answers,
    startedAt,
    completedAt,
  } = results;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getPerformanceText = (score: number) => {
    if (score >= 90) return { text: 'Excellent', color: 'text-green-600' };
    if (score >= 80) return { text: 'Very Good', color: 'text-blue-600' };
    if (score >= 70) return { text: 'Good', color: 'text-yellow-600' };
    if (score >= 60) return { text: 'Fair', color: 'text-orange-600' };
    return { text: 'Needs Improvement', color: 'text-red-600' };
  };

  const performance = getPerformanceText(averageScore);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBackToDashboard} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Header */}
      <Card className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className={`w-16 h-16 rounded-full ${INTERVIEW_TYPES[type].color} flex items-center justify-center text-white text-2xl`}>
            <Award className="w-8 h-8" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Session Completed!
        </h1>
        <p className="text-lg text-gray-600">
          {INTERVIEW_TYPES[type].label} • {formatDistance(startedAt, completedAt || new Date())}
        </p>
        
        <div className="mt-6 flex justify-center space-x-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share Results
          </Button>
        </div>
      </Card>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}%</h3>
          <p className="text-sm text-gray-600">Average Score</p>
          <p className={`text-xs font-medium mt-1 ${performance.color}`}>
            {performance.text}
          </p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{completedQuestions}/{totalQuestions}</h3>
          <p className="text-sm text-gray-600">Questions Completed</p>
          <p className="text-xs text-gray-500 mt-1">100% Completion</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatTime(totalTime)}</h3>
          <p className="text-sm text-gray-600">Total Time</p>
          <p className="text-xs text-gray-500 mt-1">
            {Math.round(totalTime / completedQuestions)}s avg per question
          </p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {answers.filter((a: any) => a.evaluation.score >= 80).length}
          </h3>
          <p className="text-sm text-gray-600">High Scores</p>
          <p className="text-xs text-gray-500 mt-1">80%+ Score</p>
        </Card>
      </div>

      {/* Detailed Question Results */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Question-by-Question Results</h2>
        
        <div className="space-y-6">
          {answers.map((item: any, index: number) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    Question {index + 1}
                  </h3>
                  <p className="text-sm text-gray-600">{item.question.question}</p>
                </div>
                <div className="text-right ml-4">
                  <div className={`text-2xl font-bold ${getPerformanceText(item.evaluation.score).color}`}>
                    {item.evaluation.score}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.question.difficulty} • {item.question.category}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <p className="text-sm text-gray-600 font-medium mb-1">Your Answer:</p>
                <p className="text-sm text-gray-900">{item.answer}</p>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-700 mb-2">{item.evaluation.feedback}</p>
                
                {item.evaluation.strengths.length > 0 && (
                  <div className="flex items-start space-x-2 text-green-700">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{item.evaluation.strengths.join(', ')}</span>
                  </div>
                )}
                
                {item.evaluation.improvements.length > 0 && (
                  <div className="flex items-start space-x-2 text-blue-700 mt-1">
                    <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{item.evaluation.improvements.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Practice More</h3>
            <p className="text-sm text-gray-600 mb-3">
              Keep practicing similar questions to improve your performance
            </p>
            <Button size="sm">Start New Session</Button>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Review Weak Areas</h3>
            <p className="text-sm text-gray-600 mb-3">
              Focus on areas where you scored below 70%
            </p>
            <Button size="sm" variant="outline">View Analytics</Button>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Try Different Type</h3>
            <p className="text-sm text-gray-600 mb-3">
              Expand your skills with other interview types
            </p>
            <Button size="sm" variant="outline">Explore Types</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};