import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthForm } from './components/auth/AuthForm';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { InterviewSession } from './components/interview/InterviewSession';
import { SessionResults } from './components/results/SessionResults';
import { InterviewType } from './types';

type AppState = 'dashboard' | 'interview' | 'results';

function App() {
  const { user, loading, isAuthenticated } = useAuth();
  const [appState, setAppState] = useState<AppState>('dashboard');
  const [selectedInterviewType, setSelectedInterviewType] = useState<InterviewType>('hr');
  const [sessionResults, setSessionResults] = useState<any>(null);

  const handleStartInterview = (type: InterviewType) => {
    setSelectedInterviewType(type);
    setAppState('interview');
  };

  const handleInterviewComplete = (results: any) => {
    setSessionResults(results);
    setAppState('results');
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
    setSessionResults(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForm onSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {appState === 'dashboard' && (
        <Dashboard onStartInterview={handleStartInterview} />
      )}
      
      {appState === 'interview' && (
        <InterviewSession
          type={selectedInterviewType}
          onBack={handleBackToDashboard}
          onComplete={handleInterviewComplete}
        />
      )}
      
      {appState === 'results' && sessionResults && (
        <SessionResults
          results={sessionResults}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;