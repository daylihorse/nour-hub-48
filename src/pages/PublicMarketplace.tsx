import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Hospital, 
  FlaskRound, 
  Store, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  ShoppingBag,
  Search,
  TrendingUp,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TenantType } from '@/types/tenant';
import { publicMarketplaceService } from '@/services/publicMarketplaceService';
import EnhancedProductCard from '@/components/marketplace/EnhancedProductCard';
import ProductSearchFilters from '@/components/marketplace/ProductSearchFilters';
import { AccessModeToggle } from '@/components/marketplace/AccessModeToggle';

interface FilterState {
  query: string;
  category: string;
  department: string;
  priceRange: [number, number];
  rating: number;
  featured: boolean;
}

const PublicMarketplace = () => {
  console.log('PublicMarketplace: Component rendering');
  
  const [selectedType, setSelectedType] = useState<TenantType | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'access' | 'products' | 'services'>('overview');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    category: '',
    department: '',
    priceRange: [0, 1000],
    rating: 0,
    featured: false
  });

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

  // Get marketplace data
  const featuredProducts = publicMarketplaceService.getFeaturedProducts();
  const featuredServices = publicMarketplaceService.getFeaturedServices();
  const filteredData = publicMarketplaceService.filterItems({
    query: filters.query,
    category: filters.category || undefined,
    department: filters.department || undefined,
    minPrice: filters.priceRange[0],
    maxPrice: filters.priceRange[1],
    rating: filters.rating || undefined,
    featured: filters.featured || undefined
  });

  const toggleFavorite = (itemId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const handleAddToCart = (item: any) => {
    console.log('Added to cart:', item.name);
    // In a real app, this would add to cart state or context
  };

  console.log('PublicMarketplace: About to render JSX');

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

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="mb-16">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="gap-2">
              <Building2 className="h-4 w-4" />
              Solutions
            </TabsTrigger>
            <TabsTrigger value="access" className="gap-2">
              <Settings className="h-4 w-4" />
              Try Now
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Star className="h-4 w-4" />
              Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
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
          </TabsContent>

          <TabsContent value="access">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Try EquiSense Now</h2>
                <p className="text-gray-600">Choose how you want to explore our platform</p>
              </div>
              <AccessModeToggle />
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
                <p className="text-gray-600">Premium products from verified vendors</p>
              </div>

              <ProductSearchFilters 
                onFiltersChange={setFilters}
                activeFilters={filters}
              />

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold">{filteredData.products.length} Products</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="font-semibold">{featuredProducts.length} Featured</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <span className="font-semibold">4.8 Avg Rating</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.products.map((product) => (
                  <EnhancedProductCard
                    key={product.id}
                    item={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onToggleFavorite={() => toggleFavorite(product.id)}
                    isFavorite={favorites.has(product.id)}
                  />
                ))}
              </div>

              {filteredData.products.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Professional Services</h2>
                <p className="text-gray-600">Expert services from certified professionals</p>
              </div>

              <ProductSearchFilters 
                onFiltersChange={setFilters}
                activeFilters={filters}
              />

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold">{filteredData.services.length} Services</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="font-semibold">{featuredServices.length} Featured</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold">Verified Providers</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.services.map((service) => (
                  <EnhancedProductCard
                    key={service.id}
                    item={service}
                    onAddToCart={() => handleAddToCart(service)}
                    onToggleFavorite={() => toggleFavorite(service.id)}
                    isFavorite={favorites.has(service.id)}
                  />
                ))}
              </div>

              {filteredData.services.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No services found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Testimonials - only show on overview tab */}
        {activeTab === 'overview' && (
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
        )}

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
