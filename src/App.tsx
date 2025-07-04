
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { EnhancedAuthProvider } from '@/components/auth/EnhancedAuthProvider';
import EnhancedAuthGuard from '@/components/auth/EnhancedAuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';

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
      <EnhancedAuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Protected Routes with Dashboard Layout */}
              <Route path="/dashboard" element={
                <EnhancedAuthGuard>
                  <DashboardLayout />
                </EnhancedAuthGuard>
              }>
                <Route index element={<Dashboard />} />
                <Route path="horses" element={<HorsesDepartment />} />
                <Route path="finance" element={<FinanceDepartment />} />
                <Route path="clinic" element={<ClinicDepartment />} />
              </Route>
            </Routes>
            
            <Toaster />
          </div>
        </Router>
      </EnhancedAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
