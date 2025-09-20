import { Evaluation, SessionResult } from '../types';

export const mockEvaluations: Evaluation[] = [
  {
    id: '1',
    answerId: '1',
    score: 85,
    maxScore: 100,
    feedback: 'Great answer! You provided a clear and structured response with good examples.',
    strengths: ['Clear communication', 'Good structure', 'Relevant examples'],
    improvements: ['Could provide more specific metrics', 'Add more technical depth'],
    categories: {
      correctness: 90,
      clarity: 85,
      grammar: 95,
      delivery: 80,
    },
    evaluatedAt: new Date('2024-01-15T10:30:00Z'),
  },
  {
    id: '2',
    answerId: '2',
    score: 72,
    maxScore: 100,
    feedback: 'Good response, but could be more specific about your motivations.',
    strengths: ['Honest approach', 'Shows enthusiasm'],
    improvements: ['Be more specific about company research', 'Connect your skills to company needs'],
    categories: {
      correctness: 75,
      clarity: 80,
      grammar: 85,
      delivery: 70,
    },
    evaluatedAt: new Date('2024-01-15T10:35:00Z'),
  },
];

export const mockSessionResults: SessionResult[] = [
  {
    sessionId: '1',
    userId: '1',
    type: 'hr',
    totalQuestions: 5,
    completedQuestions: 5,
    averageScore: 82,
    totalTime: 1800, // 30 minutes
    startedAt: new Date('2024-01-15T10:00:00Z'),
    completedAt: new Date('2024-01-15T10:30:00Z'),
  },
  {
    sessionId: '2',
    userId: '1',
    type: 'technical',
    totalQuestions: 4,
    completedQuestions: 4,
    averageScore: 78,
    totalTime: 2400, // 40 minutes
    startedAt: new Date('2024-01-14T14:00:00Z'),
    completedAt: new Date('2024-01-14T14:40:00Z'),
  },
  {
    sessionId: '3',
    userId: '1',
    type: 'aptitude',
    totalQuestions: 6,
    completedQuestions: 6,
    averageScore: 88,
    totalTime: 1500, // 25 minutes
    startedAt: new Date('2024-01-13T16:00:00Z'),
    completedAt: new Date('2024-01-13T16:25:00Z'),
  },
];