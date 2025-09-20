export const INTERVIEW_TYPES = {
  hr: {
    label: 'HR Round',
    description: 'General questions about experience, motivation, and soft skills',
    icon: '👥',
    color: 'bg-blue-500',
  },
  technical: {
    label: 'Technical Round',
    description: 'Technical questions specific to your field and expertise',
    icon: '💻',
    color: 'bg-purple-500',
  },
  aptitude: {
    label: 'Aptitude Q&A',
    description: 'Logical reasoning, quantitative, and analytical questions',
    icon: '🧠',
    color: 'bg-green-500',
  },
} as const;

export const SAMPLE_QUESTIONS = {
  hr: [
    { id: '1', question: 'Tell me about yourself and your professional background.', category: 'Introduction', difficulty: 'easy' as const },
    { id: '2', question: 'Why do you want to work for our company?', category: 'Motivation', difficulty: 'medium' as const },
    { id: '3', question: 'Describe a challenging project you worked on and how you overcame difficulties.', category: 'Problem Solving', difficulty: 'medium' as const },
    { id: '4', question: 'Where do you see yourself in 5 years?', category: 'Career Goals', difficulty: 'easy' as const },
  ],
  technical: [
    { id: '5', question: 'Explain the difference between var, let, and const in JavaScript.', category: 'JavaScript', difficulty: 'easy' as const },
    { id: '6', question: 'How would you optimize a React application for better performance?', category: 'React', difficulty: 'hard' as const },
    { id: '7', question: 'What is the time complexity of searching in a binary search tree?', category: 'Data Structures', difficulty: 'medium' as const },
    { id: '8', question: 'Explain RESTful API design principles and best practices.', category: 'API Design', difficulty: 'medium' as const },
  ],
  aptitude: [
    { id: '9', question: 'If a train travels at 60 mph for 2 hours, then 80 mph for 1 hour, what is its average speed?', category: 'Mathematics', difficulty: 'medium' as const },
    { id: '10', question: 'Complete the series: 2, 6, 12, 20, 30, ?', category: 'Pattern Recognition', difficulty: 'easy' as const },
    { id: '11', question: 'A company has 100 employees. If 60% are male and 40% of males wear glasses, how many male employees wear glasses?', category: 'Logical Reasoning', difficulty: 'easy' as const },
    { id: '12', question: 'You have 8 balls, one of which is heavier. Using a balance scale only twice, how do you find the heavier ball?', category: 'Problem Solving', difficulty: 'hard' as const },
  ],
};