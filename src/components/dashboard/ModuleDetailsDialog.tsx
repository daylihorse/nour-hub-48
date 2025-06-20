import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Check, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock,
  Target,
  Zap,
  Award,
  BarChart3,
  Lock,
  ArrowRight,
  CreditCard,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  CheckCircle2,
  Play
} from "lucide-react";

interface DepartmentModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  feature?: string;
  comingSoon?: boolean;
}

interface ModuleDetailsDialogProps {
  module: DepartmentModule | null;
  isOpen: boolean;
  onClose: () => void;
  onAccessModule: (module: DepartmentModule) => void;
  isFeatureEnabled: (feature: string) => boolean;
}

// Detailed module data with features, benefits, and pricing
const moduleDetails = {
  horses: {
    category: "Core Management",
    longDescription: "Complete horse management solution designed for breeding farms, racing stables, and equestrian facilities. Manage your entire horse operation from registration to breeding records.",
    keyFeatures: [
      "Digital Pedigree Management",
      "Breeding Record Tracking",
      "Health & Medical History",
      "Registration & Documentation",
      "Performance Analytics",
      "Bloodline Analysis"
    ],
    benefits: [
      { icon: TrendingUp, title: "Increase Breeding Success", description: "Track breeding patterns and improve success rates by 35%" },
      { icon: Shield, title: "Ensure Compliance", description: "Maintain accurate records for regulatory requirements" },
      { icon: BarChart3, title: "Data-Driven Decisions", description: "Make informed breeding decisions with comprehensive analytics" },
      { icon: Clock, title: "Save Time", description: "Reduce paperwork and administrative tasks by 60%" }
    ],
    pricing: {
      basic: "$99/month",
      premium: "$199/month",
      enterprise: "Contact Sales"
    },
    testimonial: "This system transformed our breeding program. We've seen a 40% improvement in our breeding success rate since implementation. - Happy Customer"
  },
  
  laboratory: {
    category: "Healthcare & Analysis",
    longDescription: "Advanced laboratory management system for equine testing facilities. Streamline sample processing, quality control, and result analysis with cutting-edge technology.",
    keyFeatures: [
      "Sample Management System",
      "Quality Control Protocols",
      "Result Analysis & Reporting",
      "Equipment Calibration Tracking",
      "Chain of Custody Management",
      "Automated Workflows"
    ],
    benefits: [
      { icon: Target, title: "Improve Accuracy", description: "Reduce testing errors by 50% with automated protocols" },
      { icon: Zap, title: "Faster Processing", description: "Process samples 3x faster with optimized workflows" },
      { icon: Shield, title: "Compliance Ready", description: "Meet all regulatory standards automatically" },
      { icon: BarChart3, title: "Advanced Analytics", description: "Generate insights from testing data trends" }
    ],
    pricing: {
      basic: "$149/month",
      premium: "$299/month",
      enterprise: "Contact Sales"
    },
    testimonial: "Our lab efficiency improved dramatically. We're processing more samples with fewer errors than ever before. - Lab Director"
  },

  clinic: {
    category: "Healthcare Management",
    longDescription: "Comprehensive veterinary clinic management system designed specifically for equine healthcare providers. Manage appointments, medical records, and treatment plans.",
    keyFeatures: [
      "Electronic Medical Records",
      "Appointment Scheduling",
      "Treatment Plan Management",
      "Prescription Tracking",
      "Imaging & Diagnostics",
      "Client Communication Portal"
    ],
    benefits: [
      { icon: Users, title: "Better Patient Care", description: "Comprehensive medical history at your fingertips" },
      { icon: Clock, title: "Streamlined Operations", description: "Reduce appointment scheduling conflicts by 80%" },
      { icon: TrendingUp, title: "Increased Revenue", description: "Optimize scheduling and reduce no-shows" },
      { icon: Shield, title: "HIPAA Compliant", description: "Secure patient data management" }
    ],
    pricing: {
      basic: "$129/month",
      premium: "$249/month",
      enterprise: "Contact Sales"
    },
    testimonial: "Our clinic runs smoother than ever. The integrated system saves us hours every day. - Veterinarian"
  },

  finance: {
    category: "Business Management",
    longDescription: "Complete financial management solution for equine businesses. Handle invoicing, accounting, payroll, and financial reporting with ease.",
    keyFeatures: [
      "Automated Invoicing",
      "Expense Tracking",
      "Payroll Management",
      "Financial Reporting",
      "Tax Preparation Support",
      "Multi-Currency Support"
    ],
    benefits: [
      { icon: TrendingUp, title: "Increase Profitability", description: "Track expenses and optimize your profit margins" },
      { icon: Clock, title: "Save Time", description: "Automate 90% of your financial processes" },
      { icon: BarChart3, title: "Better Insights", description: "Real-time financial dashboards and reports" },
      { icon: Shield, title: "Secure & Compliant", description: "Bank-level security for your financial data" }
    ],
    pricing: {
      basic: "$89/month",
      premium: "$179/month",
      enterprise: "Contact Sales"
    },
    testimonial: "Our financial processes are now completely streamlined. We save 20 hours per week on bookkeeping. - Farm Owner"
  },

  inventory: {
    category: "Operations",
    longDescription: "Smart inventory management system for feed, equipment, medications, and supplies. Never run out of essential items again.",
    keyFeatures: [
      "Real-time Stock Tracking",
      "Automated Reorder Points",
      "Supplier Management",
      "Barcode Scanning",
      "Cost Analysis",
      "Waste Reduction Analytics"
    ],
    benefits: [
      { icon: TrendingUp, title: "Reduce Costs", description: "Cut inventory costs by 25% with smart ordering" },
      { icon: Shield, title: "Never Stock Out", description: "Automated alerts prevent critical shortages" },
      { icon: BarChart3, title: "Optimize Usage", description: "Track consumption patterns and optimize orders" },
      { icon: Zap, title: "Streamlined Process", description: "Barcode scanning speeds up inventory tasks" }
    ],
    pricing: {
      basic: "$79/month",
      premium: "$159/month",
      enterprise: "Contact Sales"
    },
    testimonial: "We reduced our inventory holding costs by 30% while never running out of essential supplies. - Operations Manager"
  },

  clients: {
    category: "Relationship Management",
    longDescription: "Comprehensive client relationship management system designed for equine businesses. Manage all client interactions, services, and communications in one place.",
    keyFeatures: [
      "Client Profile Management",
      "Service History Tracking",
      "Communication Log",
      "Appointment Scheduling",
      "Billing & Invoicing",
      "Document Storage"
    ],
    benefits: [
      { icon: Users, title: "Better Relationships", description: "Keep detailed records of all client interactions" },
      { icon: TrendingUp, title: "Increase Revenue", description: "Identify upselling opportunities and track customer value" },
      { icon: Clock, title: "Save Time", description: "Automate follow-ups and appointment reminders" },
      { icon: Target, title: "Personalized Service", description: "Deliver tailored experiences based on client history" }
    ],
    pricing: {
      basic: "$59/month",
      premium: "$119/month",
      enterprise: "Contact Sales"
    },
    testimonial: "Client satisfaction has increased significantly since we started using this system. - Business Owner"
  },

  pharmacy: {
    category: "Healthcare Management",
    longDescription: "Complete pharmacy management solution for veterinary practices. Manage medications, prescriptions, inventory, and compliance with ease.",
    keyFeatures: [
      "Prescription Management",
      "Drug Inventory Control",
      "Compliance Monitoring",
      "Automated Ordering",
      "Expiration Tracking",
      "Dispensing Records"
    ],
    benefits: [
      { icon: Shield, title: "Ensure Compliance", description: "Automatically track DEA and regulatory requirements" },
      { icon: Target, title: "Reduce Errors", description: "Minimize dispensing errors with automated checks" },
      { icon: TrendingUp, title: "Optimize Inventory", description: "Reduce waste with smart inventory management" },
      { icon: Clock, title: "Faster Service", description: "Streamlined prescription processing" }
    ],
    pricing: {
      basic: "$119/month",
      premium: "$229/month",
      enterprise: "Contact Sales"
    },
    testimonial: "Our pharmacy operations are now fully compliant and much more efficient. - Veterinary Pharmacist"
  },

  hr: {
    category: "Human Resources",
    longDescription: "Complete human resources management system for equine businesses. Manage staff, payroll, scheduling, and compliance all in one platform.",
    keyFeatures: [
      "Employee Records Management",
      "Payroll Processing",
      "Time & Attendance Tracking",
      "Performance Management",
      "Compliance Monitoring",
      "Training & Certification"
    ],
    benefits: [
      { icon: Users, title: "Better Team Management", description: "Streamline HR processes and improve employee satisfaction" },
      { icon: Clock, title: "Save Time", description: "Automate payroll and reduce HR administrative tasks by 70%" },
      { icon: Shield, title: "Stay Compliant", description: "Ensure labor law compliance and maintain accurate records" },
      { icon: TrendingUp, title: "Improve Performance", description: "Track employee performance and identify training needs" }
    ],
    pricing: {
      basic: "$69/month",
      premium: "$139/month",
      enterprise: "Contact Sales"
    },
    testimonial: "HR management has never been easier. We've cut our HR processing time in half. - HR Manager"
  },

  marketplace: {
    category: "E-Commerce",
    longDescription: "Comprehensive marketplace platform for buying and selling horses, equipment, and services. Connect with buyers and sellers worldwide.",
    keyFeatures: [
      "Horse Sales Platform",
      "Equipment Marketplace",
      "Service Directory",
      "Secure Payment Processing",
      "Rating & Review System",
      "Advanced Search Filters"
    ],
    benefits: [
      { icon: TrendingUp, title: "Expand Market Reach", description: "Access global marketplace with thousands of buyers" },
      { icon: Shield, title: "Secure Transactions", description: "Protected payments and verified seller profiles" },
      { icon: Target, title: "Better Matching", description: "Advanced filters help find the perfect match" },
      { icon: BarChart3, title: "Market Insights", description: "Track market trends and pricing analytics" }
    ],
    pricing: {
      basic: "$49/month",
      premium: "$99/month",
      enterprise: "Contact Sales"
    },
    testimonial: "We've sold more horses through this platform than any other marketplace. - Breeder"
  },

  movements: {
    category: "Logistics",
    longDescription: "Advanced horse movement and transportation management system. Track movements, manage logistics, and ensure safe transportation.",
    keyFeatures: [
      "Movement Tracking",
      "Transportation Scheduling",
      "Health Certificate Management",
      "Route Optimization",
      "Driver Management",
      "GPS Tracking Integration"
    ],
    benefits: [
      { icon: Shield, title: "Ensure Safety", description: "Track every movement with GPS and health monitoring" },
      { icon: Clock, title: "Optimize Routes", description: "Reduce travel time and costs with smart routing" },
      { icon: BarChart3, title: "Better Planning", description: "Historical data helps optimize future movements" },
      { icon: Target, title: "Compliance Ready", description: "Automated health certificate and permit tracking" }
    ],
    pricing: {
      basic: "$89/month",
      premium: "$179/month",
      enterprise: "Contact Sales"
    },
    testimonial: "Movement tracking has eliminated our logistics headaches completely. - Transport Manager"
  },

  training: {
    category: "Education",
    longDescription: "Comprehensive training program management for horses and riders. Track progress, schedule sessions, and manage certifications.",
    keyFeatures: [
      "Training Schedule Management",
      "Progress Tracking",
      "Instructor Management",
      "Certification Tracking",
      "Performance Analytics",
      "Video Session Recording"
    ],
    benefits: [
      { icon: Award, title: "Better Results", description: "Structured programs improve training outcomes by 45%" },
      { icon: BarChart3, title: "Track Progress", description: "Detailed analytics show improvement over time" },
      { icon: Users, title: "Instructor Tools", description: "Comprehensive tools for training professionals" },
      { icon: Target, title: "Goal Achievement", description: "Set and track training milestones effectively" }
    ],
    pricing: {
      basic: "$79/month",
      premium: "$159/month",
      enterprise: "Contact Sales"
    },
    testimonial: "Our training programs are now more organized and effective than ever. - Training Director"
  },

  "riding-reservations": {
    category: "Booking Management",
    longDescription: "Complete booking and reservation system for riding lessons, facility usage, and event scheduling. Optimize your facility utilization.",
    keyFeatures: [
      "Online Booking System",
      "Instructor Scheduling",
      "Facility Management",
      "Payment Processing",
      "Calendar Integration",
      "Automated Reminders"
    ],
    benefits: [
      { icon: TrendingUp, title: "Increase Bookings", description: "Online booking increases reservations by 60%" },
      { icon: Clock, title: "Reduce No-Shows", description: "Automated reminders cut no-shows by 40%" },
      { icon: Users, title: "Better Customer Experience", description: "Easy online booking improves customer satisfaction" },
      { icon: BarChart3, title: "Optimize Utilization", description: "Analytics help maximize facility usage" }
    ],
    pricing: {
      basic: "$59/month",
      premium: "$119/month",
      enterprise: "Contact Sales"
    },
    testimonial: "Our booking efficiency has improved dramatically with automated scheduling. - Facility Manager"
  },

  "stable-rooms": {
    category: "Facility Management",
    longDescription: "Complete stable and room management system. Optimize space utilization, track maintenance, and manage assignments efficiently.",
    keyFeatures: [
      "Space Management",
      "Assignment Tracking",
      "Maintenance Scheduling",
      "Occupancy Analytics",
      "Facility Mapping",
      "Automated Billing"
    ],
    benefits: [
      { icon: BarChart3, title: "Optimize Space", description: "Maximize facility utilization and revenue" },
      { icon: Shield, title: "Preventive Maintenance", description: "Schedule maintenance to prevent costly repairs" },
      { icon: TrendingUp, title: "Increase Revenue", description: "Better space management increases occupancy rates" },
      { icon: Clock, title: "Streamline Operations", description: "Automate assignments and billing processes" }
    ],
    pricing: {
      basic: "$69/month",
      premium: "$139/month",
      enterprise: "Contact Sales"
    },
    testimonial: "We've increased our stable utilization by 30% with better management tools. - Stable Owner"
  },

  maintenance: {
    category: "Facility Management",
    longDescription: "Comprehensive maintenance management system for equine facilities. Schedule, track, and optimize all maintenance activities.",
    keyFeatures: [
      "Preventive Maintenance Scheduling",
      "Work Order Management",
      "Equipment Tracking",
      "Inventory Integration",
      "Cost Tracking",
      "Maintenance History"
    ],
    benefits: [
      { icon: Shield, title: "Prevent Breakdowns", description: "Preventive maintenance reduces emergency repairs by 70%" },
      { icon: TrendingUp, title: "Reduce Costs", description: "Optimize maintenance schedules and reduce expenses" },
      { icon: Clock, title: "Save Time", description: "Streamlined work orders and automated scheduling" },
      { icon: BarChart3, title: "Better Planning", description: "Historical data improves maintenance planning" }
    ],
    pricing: {
      basic: "$59/month",
      premium: "$119/month",
      enterprise: "Contact Sales"
    },
    testimonial: "Our maintenance costs have dropped 25% with better scheduling and tracking. - Facilities Manager"
  },

  messages: {
    category: "Communication",
    longDescription: "Integrated messaging and communication center for your equine business. Keep teams connected and customers informed.",
    keyFeatures: [
      "Internal Messaging",
      "Customer Communications",
      "Automated Notifications",
      "Group Messaging",
      "Message Templates",
      "Communication History"
    ],
    benefits: [
      { icon: Users, title: "Better Communication", description: "Improve team coordination and customer relationships" },
      { icon: Clock, title: "Save Time", description: "Automated messaging and templates save hours daily" },
      { icon: Target, title: "Reduce Missed Messages", description: "Centralized system ensures no communication is lost" },
      { icon: Shield, title: "Secure Messaging", description: "Encrypted communications protect sensitive information" }
    ],
    pricing: {
      basic: "$39/month",
      premium: "$79/month",
      enterprise: "Contact Sales"
    },
    testimonial: "Communication across our team has never been better or more organized. - Operations Manager"
  }
};

const ModuleDetailsDialog: React.FC<ModuleDetailsDialogProps> = ({
  module,
  isOpen,
  onClose,
  onAccessModule,
  isFeatureEnabled
}) => {
  const [showUpgradeForm, setShowUpgradeForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'enterprise' | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  if (!module) return null;

  const details = moduleDetails[module.id as keyof typeof moduleDetails];
  const isLocked = module.feature && !isFeatureEnabled(module.feature);
  const isComingSoon = module.comingSoon;
  const isAvailable = !isLocked && !isComingSoon;

  const handlePlanSelection = (plan: 'basic' | 'premium' | 'enterprise') => {
    setSelectedPlan(plan);
    if (plan === 'enterprise') {
      setShowUpgradeForm(true);
    } else {
      // For basic/premium, show immediate trial setup
      handleStartTrial(plan);
    }
  };

  const handleStartTrial = (plan: 'basic' | 'premium') => {
    // Simulate starting a trial
    console.log(`Starting ${plan} trial for ${module.title}`);
    setSelectedPlan(plan);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      onClose();
    }, 2500);
  };

  const handleContactSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Contact form submitted:', { ...contactForm, module: module.title, plan: selectedPlan });
    setIsSubmitting(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowUpgradeForm(false);
      onClose();
    }, 2500);
  };

  const renderActionButtons = () => {
    if (isComingSoon) {
      return (
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => setShowUpgradeForm(true)}
            variant="outline" 
            className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Get Notified When Available
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
        </div>
      );
    }

    if (isLocked) {
      return (
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => setShowUpgradeForm(true)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Upgrade to Access
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleStartTrial('basic')}
              className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Free Trial
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex gap-3">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Close
        </Button>
        <Button 
          onClick={() => onAccessModule(module)} 
          className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          <ArrowRight className="h-4 w-4 mr-2" />
          Access Module
        </Button>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{module.icon}</div>
            <div>
              <DialogTitle className="text-2xl font-bold">{module.title}</DialogTitle>
              {details && (
                <Badge variant="secondary" className="mt-2">{details.category}</Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">About This Module</h3>
              <p className="text-muted-foreground leading-relaxed">
                {details?.longDescription || module.description}
              </p>
            </div>

            {details?.testimonial && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm italic text-blue-800">"{details.testimonial}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {details?.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Business Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details?.benefits.map((benefit, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <benefit.icon className="h-5 w-5 text-blue-600" />
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            {showSuccessMessage && (
              <Card className="bg-green-50 border-green-200 mb-4">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 text-green-700">
                    <CheckCircle2 className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Success!</p>
                      <p className="text-sm">
                        {selectedPlan === 'enterprise' 
                          ? "We'll contact you within 24 hours to discuss your enterprise needs."
                          : `Your ${selectedPlan} trial for ${module.title} has been activated!`
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {showUpgradeForm && (
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    {selectedPlan === 'enterprise' ? 'Contact Sales' : 'Get Notified'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder={selectedPlan === 'enterprise' 
                        ? "Tell us about your requirements and how we can help..."
                        : "Any specific questions or requirements? (optional)"
                      }
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowUpgradeForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleContactSubmit}
                      disabled={isSubmitting || !contactForm.name || !contactForm.email}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          {selectedPlan === 'enterprise' ? 'Contact Sales' : 'Get Notified'}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-4">Pricing Plans</h3>
              {details?.pricing ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Basic Plan */}
                  <Card className="relative cursor-pointer hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <CardTitle className="text-center">Basic</CardTitle>
                      <div className="text-center">
                        <span className="text-3xl font-bold">{details.pricing.basic}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">Perfect for small operations</p>
                      <ul className="text-sm space-y-2 text-left mb-6">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          Core features included
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          Email support
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          Basic reporting
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          Up to 50 records
                        </li>
                      </ul>
                      <Button 
                        onClick={() => handlePlanSelection('basic')}
                        variant="outline" 
                        className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start 14-Day Free Trial
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Premium Plan */}
                  <Card className="relative cursor-pointer hover:shadow-lg transition-shadow duration-200 border-blue-200 bg-blue-50">
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                      Most Popular
                    </Badge>
                    <CardHeader>
                      <CardTitle className="text-center">Premium</CardTitle>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-blue-600">{details.pricing.premium}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">For growing businesses</p>
                      <ul className="text-sm space-y-2 text-left mb-6">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          All Basic features
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          Advanced analytics
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          Priority support
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          API access
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          Unlimited records
                        </li>
                      </ul>
                      <Button 
                        onClick={() => handlePlanSelection('premium')}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Start 30-Day Free Trial
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Enterprise Plan */}
                  <Card className="relative cursor-pointer hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <CardTitle className="text-center">Enterprise</CardTitle>
                      <div className="text-center">
                        <span className="text-lg font-bold">{details.pricing.enterprise}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">For large organizations</p>
                      <ul className="text-sm space-y-2 text-left mb-6">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          All Premium features
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          Custom integrations
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          Dedicated support
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          On-premise option
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          Custom training
                        </li>
                      </ul>
                      <Button 
                        onClick={() => handlePlanSelection('enterprise')}
                        variant="outline" 
                        className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Sales
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">Pricing information will be available soon.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setShowUpgradeForm(true)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Request Quote
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Additional Value Proposition */}
              <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="h-6 w-6 text-green-600" />
                    <h4 className="font-semibold text-green-800">Why Choose Our {module.title} Module?</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-green-700">
                      <Shield className="h-4 w-4" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700">
                      <Users className="h-4 w-4" />
                      <span>24/7 customer support</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-700">
                      <Zap className="h-4 w-4" />
                      <span>Setup in under 5 minutes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex-col sm:flex-row gap-3 mt-6">
          {renderActionButtons()}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleDetailsDialog; 