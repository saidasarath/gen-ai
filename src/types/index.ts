export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Question {
  id: string;
  type: 'hr' | 'technical' | 'aptitude';
  question: string;
  category?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Answer {
  id: string;
  questionId: string;
  userId: string;
  content: string;
  type: 'text' | 'voice';
  submittedAt: Date;
}

export interface Evaluation {
  id: string;
  answerId: string;
  score: number;
  maxScore: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  categories: {
    correctness: number;
    clarity: number;
    grammar: number;
    delivery: number;
  };
  evaluatedAt: Date;
}

export interface SessionResult {
  sessionId: string;
  userId: string;
  type: 'hr' | 'technical' | 'aptitude';
  totalQuestions: number;
  completedQuestions: number;
  averageScore: number;
  totalTime: number;
  startedAt: Date;
  completedAt?: Date;
}

export type InterviewType = 'hr' | 'technical' | 'aptitude';