
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AccessModeProvider } from '@/contexts/AccessModeContext';
import { EnhancedAuthProvider } from '@/components/auth/EnhancedAuthProvider';
import EnhancedAuthGuard from '@/components/auth/EnhancedAuthGuard';
import PublicMarketplace from '@/pages/PublicMarketplace';
import Dashboard from '@/pages/dashboard/Dashboard';
import Login from '@/pages/Login';
import OnboardingEntry from '@/pages/onboarding/OnboardingEntry';
import './App.css';

function App() {
  console.log('App: Component rendering');
  
  return (
    <AccessModeProvider>
      <EnhancedAuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public route - no auth required */}
              <Route path="/" element={<PublicMarketplace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/onboarding" element={<OnboardingEntry />} />
              <Route path="/onboarding/:tenantType" element={<OnboardingEntry />} />
              
              {/* Protected routes */}
              <Route path="/dashboard/*" element={
                <EnhancedAuthGuard>
                  <Dashboard />
                </EnhancedAuthGuard>
              } />
              
              {/* Catch all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </EnhancedAuthProvider>
    </AccessModeProvider>
  );
}

export default App;
