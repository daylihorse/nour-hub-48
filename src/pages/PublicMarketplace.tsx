
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Hospital, 
  FlaskRound, 
  Store, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TenantType } from '@/types/tenant';

const PublicMarketplace = () => {
  const [selectedType, setSelectedType] = useState<TenantType | null>(null);

  const tenantTypes = [
    {
      type: 'stable' as TenantType,
      title: 'Equestrian Stable',
      description: 'Comprehensive horse management, breeding records, and training programs',
      icon: Building2,
      features: ['Horse Management', 'Breeding Records', 'Training Programs', 'Facility Management'],
      price: 'From $99/month',
      popular: true,
      color: 'bg-blue-500'
    },
    {
      type: 'clinic' as TenantType,
      title: 'Veterinary Clinic',
      description: 'Complete veterinary practice management with appointments and medical records',
      icon: Hospital,
      features: ['Appointment Scheduling', 'Medical Records', 'Prescription Management', 'Client Portal'],
      price: 'From $149/month',
      popular: false,
      color: 'bg-green-500'
    },
    {
      type: 'laboratory' as TenantType,
      title: 'Diagnostic Laboratory',
      description: 'Advanced laboratory management with testing workflows and quality control',
      icon: FlaskRound,
      features: ['Sample Management', 'Test Results', 'Quality Control', 'Equipment Tracking'],
      price: 'From $199/month',
      popular: false,
      color: 'bg-purple-500'
    },
    {
      type: 'hospital' as TenantType,
      title: 'Veterinary Hospital',
      description: 'Full-service hospital management with surgical suites and emergency care',
      icon: Hospital,
      features: ['Emergency Management', 'Surgical Scheduling', 'ICU Monitoring', 'Staff Coordination'],
      price: 'From $299/month',
      popular: false,
      color: 'bg-red-500'
    },
    {
      type: 'marketplace' as TenantType,
      title: 'Equine Marketplace',
      description: 'Online marketplace for buying and selling horses, equipment, and services',
      icon: Store,
      features: ['Product Listings', 'Payment Processing', 'Buyer/Seller Matching', 'Transaction Management'],
      price: 'From $79/month',
      popular: false,
      color: 'bg-pink-500'
    },
    {
      type: 'enterprise' as TenantType,
      title: 'Enterprise Solution',
      description: 'Multi-facility management with advanced analytics and custom integrations',
      icon: Users,
      features: ['Multi-Location', 'Advanced Analytics', 'Custom Integrations', 'White Label'],
      price: 'Custom Pricing',
      popular: false,
      color: 'bg-orange-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Stable Owner',
      company: 'Sunset Stables',
      content: 'This platform transformed how we manage our 50+ horses. The breeding module alone saved us countless hours.',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Veterinarian',
      company: 'Equine Health Center',
      content: 'The integrated approach between clinic management and horse records is exactly what our practice needed.',
      rating: 5
    },
    {
      name: 'Lisa Thompson',
      role: 'Lab Director',
      company: 'Advanced Equine Diagnostics',
      content: 'Quality control features and automated workflows have significantly improved our testing accuracy.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">EquiSense</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            The Complete Equine
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Management Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From stables to clinics, laboratories to marketplaces - discover the perfect solution for your equine business. 
            Join thousands of professionals who trust EquiSense for their daily operations.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge className="px-4 py-2 bg-green-100 text-green-800">
              <CheckCircle className="h-4 w-4 mr-2" />
              30-Day Free Trial
            </Badge>
            <Badge className="px-4 py-2 bg-blue-100 text-blue-800">
              <Zap className="h-4 w-4 mr-2" />
              Setup in Minutes
            </Badge>
          </div>
        </div>

        {/* Tenant Type Selection */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Solution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tenantTypes.map((tenant) => (
              <Card 
                key={tenant.type}
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  selectedType === tenant.type ? 'ring-2 ring-blue-500 shadow-xl' : ''
                } ${tenant.popular ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setSelectedType(tenant.type)}
              >
                {tenant.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${tenant.color} flex items-center justify-center mb-4`}>
                    <tenant.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{tenant.title}</CardTitle>
                  <p className="text-gray-600">{tenant.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {tenant.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{tenant.price}</span>
                    {selectedType === tenant.type && (
                      <Link to={`/onboarding/${tenant.type}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Get Started
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Equine Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who have streamlined their operations with EquiSense
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicMarketplace;
