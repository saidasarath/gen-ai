import React from 'react';
import { Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { SessionResult } from '../../types';
import { formatDistance } from 'date-fns';
import { INTERVIEW_TYPES } from '../../lib/constants';

interface RecentSessionsProps {
  sessions: SessionResult[];
}

export const RecentSessions: React.FC<RecentSessionsProps> = ({ sessions }) => {
  return (
    <div className="space-y-4">
      {sessions.slice(0, 5).map((session) => (
        <div
          key={session.sessionId}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${INTERVIEW_TYPES[session.type].color} flex items-center justify-center text-white font-medium`}>
              {INTERVIEW_TYPES[session.type].icon}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                {INTERVIEW_TYPES[session.type].label}
              </h4>
              <p className="text-sm text-gray-600">
                {formatDistance(session.startedAt, new Date(), { addSuffix: true })}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="font-medium text-gray-900">
                {session.averageScore}%
              </span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Clock className="w-3 h-3" />
              <span>{Math.floor(session.totalTime / 60)}min</span>
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>{session.completedQuestions}Q</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};