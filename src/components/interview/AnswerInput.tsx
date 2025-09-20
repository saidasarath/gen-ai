import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Mic, MicOff, Send, Type } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({
  onSubmit,
  isLoading,
  disabled,
}) => {
  const [answer, setAnswer] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');

  const { isListening, isSupported, startListening, stopListening } = useSpeechRecognition({
    onResult: (transcript) => {
      setAnswer(transcript);
    },
    onError: (error) => {
      console.error('Speech recognition error:', error);
    },
  });

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  const toggleVoiceRecording = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Your Answer</h3>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={inputMode === 'text' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setInputMode('text')}
              disabled={disabled}
            >
              <Type className="w-4 h-4 mr-1" />
              Text
            </Button>
            
            {isSupported && (
              <Button
                variant={inputMode === 'voice' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setInputMode('voice')}
                disabled={disabled}
              >
                <Mic className="w-4 h-4 mr-1" />
                Voice
              </Button>
            )}
          </div>
        </div>

        {inputMode === 'text' && (
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={disabled}
          />
        )}

        {inputMode === 'voice' && (
          <div className="text-center py-8">
            {isListening ? (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                  <Mic className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-gray-600">Listening... Click to stop recording</p>
                <Button variant="danger" onClick={toggleVoiceRecording}>
                  <MicOff className="w-4 h-4 mr-2" />
                  Stop Recording
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Mic className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-600">Click to start recording your answer</p>
                <Button onClick={toggleVoiceRecording} disabled={disabled}>
                  <Mic className="w-4 h-4 mr-2" />
                  Start Recording
                </Button>
              </div>
            )}
          </div>
        )}

        {answer && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Your answer:</p>
            <p className="text-gray-900">{answer}</p>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!answer.trim() || disabled}
            loading={isLoading}
            size="lg"
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? 'Evaluating...' : 'Submit Answer'}
          </Button>
        </div>
      </div>
    </Card>
  );
};