
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { EnhancedAuthProvider } from '@/components/auth/EnhancedAuthProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import EnhancedAuthGuard from '@/components/auth/EnhancedAuthGuard';

// Page imports
import LoginForm from '@/components/auth/LoginForm';
import Dashboard from '@/pages/Dashboard';
import HorsesDepartment from '@/pages/dashboard/HorsesDepartment';
import FinanceDepartment from '@/pages/dashboard/FinanceDepartment';
import ClinicDepartment from '@/pages/dashboard/ClinicDepartment';
import ClientsProfile from '@/pages/clients/ClientsProfile';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
                
                <Route path="/clients/:clientId" element={
                  <EnhancedAuthGuard>
                    <ClientsProfile />
                  </EnhancedAuthGuard>
                } />
              </Routes>
              
              <Toaster />
            </div>
          </Router>
        </EnhancedAuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
