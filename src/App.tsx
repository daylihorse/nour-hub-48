
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { EnhancedAuthProvider } from '@/components/auth/EnhancedAuthProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AccessModeProvider } from '@/contexts/AccessModeContext';
import EnhancedAuthGuard from '@/components/auth/EnhancedAuthGuard';

// Page imports
import LoginForm from '@/components/auth/LoginForm';
import Dashboard from '@/pages/dashboard/Dashboard';
import HorsesDepartment from '@/pages/dashboard/HorsesDepartment';
import FinanceDepartment from '@/pages/dashboard/FinanceDepartment';
import ClinicDepartment from '@/pages/dashboard/ClinicDepartment';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessModeProvider>
        <LanguageProvider>
          <EnhancedAuthProvider>
            <Router>
              <div className="min-h-screen bg-background">
                <Routes>
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <EnhancedAuthGuard>
                      <Dashboard />
                    </EnhancedAuthGuard>
                  } />
                  
                  <Route path="/dashboard/horses" element={
                    <EnhancedAuthGuard>
                      <HorsesDepartment />
                    </EnhancedAuthGuard>
                  } />
                  
                  <Route path="/dashboard/finance" element={
                    <EnhancedAuthGuard>
                      <FinanceDepartment />
                    </EnhancedAuthGuard>
                  } />
                  
                  <Route path="/dashboard/clinic" element={
                    <EnhancedAuthGuard>
                      <ClinicDepartment />
                    </EnhancedAuthGuard>
                  } />
                </Routes>
                
                <Toaster />
              </div>
            </Router>
          </EnhancedAuthProvider>
        </LanguageProvider>
      </AccessModeProvider>
    </QueryClientProvider>
  );
}

export default App;
