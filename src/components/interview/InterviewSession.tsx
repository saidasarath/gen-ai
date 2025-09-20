import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { QuestionDisplay } from './QuestionDisplay';
import { AnswerInput } from './AnswerInput';
import { EvaluationResult } from './EvaluationResult';
import { SessionProgress } from './SessionProgress';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { InterviewType, Question, Evaluation } from '../../types';
import { SAMPLE_QUESTIONS } from '../../lib/constants';
import { mockEvaluations } from '../../lib/mockData';

interface InterviewSessionProps {
  type: InterviewType;
  onBack: () => void;
  onComplete: (results: any) => void;
}

export const InterviewSession: React.FC<InterviewSessionProps> = ({
  type,
  onBack,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<Evaluation | null>(null);
  const [sessionAnswers, setSessionAnswers] = useState<Array<{ question: Question; answer: string; evaluation: Evaluation }>>([]);
  const [startTime] = useState(new Date());

  const questions = SAMPLE_QUESTIONS[type];
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSubmit = async (answer: string) => {
    setUserAnswer(answer);
    setIsEvaluating(true);

    // Simulate API call to Gemini for evaluation
    setTimeout(() => {
      const mockEvaluation: Evaluation = {
        ...mockEvaluations[0],
        id: Date.now().toString(),
        score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        feedback: `Good response to "${currentQuestion.question}". ${mockEvaluations[0].feedback}`,
      };

      setCurrentEvaluation(mockEvaluation);
      setSessionAnswers(prev => [...prev, {
        question: currentQuestion,
        answer,
        evaluation: mockEvaluation,
      }]);
      setIsEvaluating(false);
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Complete session
      const endTime = new Date();
      const totalTime = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      const averageScore = sessionAnswers.reduce((acc, item) => acc + item.evaluation.score, 0) / sessionAnswers.length;

      onComplete({
        sessionId: Date.now().toString(),
        type,
        totalQuestions: questions.length,
        completedQuestions: sessionAnswers.length,
        averageScore,
        totalTime,
        answers: sessionAnswers,
        startedAt: startTime,
        completedAt: endTime,
      });
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setCurrentEvaluation(null);
    }
  };

  const progress = ((currentQuestionIndex + (currentEvaluation ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <SessionProgress
          progress={progress}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          type={type}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuestionDisplay
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />

          {!currentEvaluation && (
            <AnswerInput
              onSubmit={handleAnswerSubmit}
              isLoading={isEvaluating}
              disabled={!!currentEvaluation}
            />
          )}

          {currentEvaluation && (
            <div className="space-y-4">
              <EvaluationResult evaluation={currentEvaluation} />
              <div className="flex justify-center">
                <Button onClick={handleNextQuestion} size="lg">
                  {isLastQuestion ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Session
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Next Question
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Session Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Questions</span>
                <span className="font-medium">{currentQuestionIndex + 1}/{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Answered</span>
                <span className="font-medium">{sessionAnswers.length}</span>
              </div>
              {sessionAnswers.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Score</span>
                  <span className="font-medium">
                    {Math.round(sessionAnswers.reduce((acc, item) => acc + item.evaluation.score, 0) / sessionAnswers.length)}%
                  </span>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Be specific and provide examples</li>
              <li>• Structure your answers clearly</li>
              <li>• Use the STAR method for behavioral questions</li>
              <li>• Take your time to think before answering</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};