import React, { useState } from 'react';
import { PortalSelection } from './pages/PortalSelection';
import { LoginPage } from './pages/LoginPage';
import { AdminPortal } from './pages/AdminPortal';
import { CandidatePortal } from './pages/CandidatePortal';
import { Presentation } from './pages/Presentation';

import { 
  mockCandidates, mockAnalyses, mockJobs, mockApplications, mockMessages 
} from './data/mockCandidates';
import type { Candidate, Application, MessageThread } from './types';

export const App: React.FC = () => {
  // Portal route state: 'selection' | 'admin-login' | 'candidate-login' | 'admin' | 'candidate' | 'presentation'
  const [portal, setPortal] = useState<'selection' | 'admin-login' | 'candidate-login' | 'admin' | 'candidate' | 'presentation'>('selection');

  // Shared Global States
  const [applicationsList, setApplicationsList] = useState<Application[]>(mockApplications);
  const [messagesList, setMessagesList] = useState<MessageThread[]>(mockMessages);
  
  // Recruiter credentials state
  const [recruiter, setRecruiter] = useState({
    name: 'Alex Thompson',
    email: 'alex.thompson@nexus.ai',
    company: 'NEXUS Intelligence'
  });

  // Default candidate for candidate portal
  const defaultCandidate: Candidate = mockCandidates.find(c => c.id === 'sarah-jenkins') || mockCandidates[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Selection Page */}
      {portal === 'selection' && (
        <PortalSelection 
          onSelectPortal={(selectedRoute) => setPortal(selectedRoute)} 
        />
      )}

      {/* Recruiter Login Page */}
      {portal === 'admin-login' && (
        <LoginPage 
          role="admin"
          onLogin={() => setPortal('admin')} 
          onBack={() => setPortal('selection')} 
        />
      )}

      {/* Candidate Login Page */}
      {portal === 'candidate-login' && (
        <LoginPage 
          role="candidate"
          onLogin={() => setPortal('candidate')} 
          onBack={() => setPortal('selection')} 
        />
      )}

      {/* Admin Recruiter Workspace Portal */}
      {portal === 'admin' && (
        <AdminPortal 
          candidates={mockCandidates}
          analyses={mockAnalyses}
          jobs={mockJobs}
          applications={applicationsList}
          messages={messagesList}
          setApplications={setApplicationsList}
          setMessages={setMessagesList}
          onSignOut={() => setPortal('selection')}
          recruiter={recruiter}
          setRecruiter={setRecruiter}
        />
      )}

      {/* Candidate Career Portal */}
      {portal === 'candidate' && (
        <CandidatePortal 
          candidate={defaultCandidate}
          jobs={mockJobs}
          applications={applicationsList}
          setApplications={setApplicationsList}
          onSignOut={() => setPortal('selection')}
        />
      )}

      {/* Presentation Slideshow Portal */}
      {portal === 'presentation' && (
        <Presentation onBack={() => setPortal('selection')} />
      )}
    </div>
  );
};

export default App;
