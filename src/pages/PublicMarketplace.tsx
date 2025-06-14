
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  UserCheck, 
  ArrowRight, 
  Horse,
  Activity,
  Shield,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import AccessModeToggle from "@/components/marketplace/AccessModeToggle";
import { useAccessMode } from "@/contexts/AccessModeContext";

const PublicMarketplace = () => {
  const { setAccessMode } = useAccessMode();

  const handleEnterDashboard = (mode: 'public' | 'demo') => {
    setAccessMode(mode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <Horse className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EquiSense</h1>
                <p className="text-sm text-gray-600">Complete Equine Management Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/dashboard" onClick={() => handleEnterDashboard('public')}>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Eye className="h-5 w-5 mr-2" />
                  Explore Dashboard
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-6">
              🚀 Try EquiSense - No Signup Required
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Complete
              <span className="text-blue-600"> Equine Management</span>
              <br />Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Manage your horses, track health records, handle breeding, monitor training, 
              and run your equine business all in one powerful platform.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/dashboard" onClick={() => handleEnterDashboard('public')}>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4">
                  <Eye className="h-6 w-6 mr-3" />
                  Explore Now - No Login Required
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Button>
              </Link>
              <Link to="/" onClick={() => handleEnterDashboard('demo')}>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2">
                  <UserCheck className="h-6 w-6 mr-3" />
                  Try Demo Accounts
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-gray-500">
              ✨ Experience the full platform instantly • No registration required • Try all features
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white/60">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Equine Management
            </h2>
            <p className="text-gray-600">
              From individual horse owners to large equestrian facilities, EquiSense adapts to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardHeader>
                <Horse className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Horse Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Complete horse profiles, breeding records, health tracking, and performance monitoring
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-green-200 bg-green-50/50">
              <CardHeader>
                <Activity className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Health & Veterinary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Medical records, vaccination schedules, lab results, and veterinary clinic management
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-200 bg-purple-50/50">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Business Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Financial management, staff coordination, facility maintenance, and client relations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Access Mode Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Experience
              </h2>
              <p className="text-gray-600">
                Explore EquiSense with public access or try our realistic demo accounts
              </p>
            </div>
            
            <AccessModeToggle />
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">Ready to get started?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" onClick={() => handleEnterDashboard('public')}>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Zap className="h-5 w-5 mr-2" />
                Start Exploring Now
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicMarketplace;
