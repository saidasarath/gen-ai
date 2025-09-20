import React from 'react';
import { Card } from '../ui/Card';
import { CheckCircle, TrendingUp, AlertCircle, Star } from 'lucide-react';
import { Evaluation } from '../../types';

interface EvaluationResultProps {
  evaluation: Evaluation;
}

export const EvaluationResult: React.FC<EvaluationResultProps> = ({ evaluation }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <Card>
      <div className="space-y-6">
        {/* Score Section */}
        <div className="text-center">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-2xl font-bold ${getScoreBgColor(evaluation.score)} ${getScoreColor(evaluation.score)}`}>
            {evaluation.score}%
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mt-3">
            Answer Evaluation
          </h3>
          <p className="text-gray-600">{evaluation.feedback}</p>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(evaluation.categories).map(([category, score]) => (
            <div key={category} className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-sm font-semibold ${getScoreBgColor(score)} ${getScoreColor(score)}`}>
                {score}%
              </div>
              <p className="text-xs text-gray-600 mt-1 capitalize">{category}</p>
            </div>
          ))}
        </div>

        {/* Strengths */}
        {evaluation.strengths.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Strengths</h4>
            </div>
            <ul className="space-y-1">
              {evaluation.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Star className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas for Improvement */}
        {evaluation.improvements.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Areas for Improvement</h4>
            </div>
            <ul className="space-y-1">
              {evaluation.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};