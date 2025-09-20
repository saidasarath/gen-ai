import React from 'react';
import { InterviewType } from '../../types';
import { INTERVIEW_TYPES } from '../../lib/constants';

interface SessionProgressProps {
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
  type: InterviewType;
}

export const SessionProgress: React.FC<SessionProgressProps> = ({
  progress,
  currentQuestion,
  totalQuestions,
  type,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg ${INTERVIEW_TYPES[type].color} flex items-center justify-center text-white font-medium`}>
            {INTERVIEW_TYPES[type].icon}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {INTERVIEW_TYPES[type].label}
            </h2>
            <p className="text-sm text-gray-600">
              Question {currentQuestion} of {totalQuestions}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(progress)}%
          </div>
          <div className="text-sm text-gray-600">Complete</div>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};