
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AccessModeProvider } from '@/contexts/AccessModeContext';
import { EnhancedAuthProvider } from '@/components/auth/EnhancedAuthProvider';
import { EnhancedAuthGuard } from '@/components/auth/EnhancedAuthGuard';
import PublicMarketplace from '@/pages/PublicMarketplace';
import Dashboard from '@/pages/Dashboard';
import LoginPage from '@/pages/LoginPage';
import OnboardingPage from '@/pages/OnboardingPage';
import './App.css';

function App() {
  return (
    <AccessModeProvider>
      <EnhancedAuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public route - no auth required */}
              <Route path="/" element={<PublicMarketplace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/onboarding/:tenantType" element={<OnboardingPage />} />
              
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
