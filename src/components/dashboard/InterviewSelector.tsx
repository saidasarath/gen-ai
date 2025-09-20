import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Play } from 'lucide-react';
import { INTERVIEW_TYPES } from '../../lib/constants';
import { InterviewType } from '../../types';

interface InterviewSelectorProps {
  onSelect: (type: InterviewType) => void;
}

export const InterviewSelector: React.FC<InterviewSelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(INTERVIEW_TYPES).map(([key, type]) => (
        <Card key={key} hover className="text-center">
          <div className={`w-16 h-16 rounded-full ${type.color} flex items-center justify-center text-white text-2xl mx-auto mb-4`}>
            {type.icon}
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{type.label}</h3>
          <p className="text-sm text-gray-600 mb-4">{type.description}</p>
          <Button
            onClick={() => onSelect(key as InterviewType)}
            className="w-full"
            size="sm"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Session
          </Button>
        </Card>
      ))}
    </div>
  );
};