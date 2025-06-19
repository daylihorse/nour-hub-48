import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, DollarSign, TrendingUp, Calculator, FileText, CreditCard, Building, Users, BarChart3, Shield, Zap } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SubModule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  isCore?: boolean;
}

interface ModuleCategory {
  category: string;
  modules: SubModule[];
}

interface FinanceModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const financeModuleConfig: FinanceModuleConfig = {
  id: "finance",
  name: "Finance Management",
  description: "Comprehensive financial management with accounting, invoicing, and reporting capabilities",
  isActive: true,
  submodules: [
    {
      category: "Core Features",
      modules: [
        {
          id: "finance-overview",
          name: "Finance Overview",
          description: "Dashboard with key financial metrics and insights",
          isActive: true,
          isCore: true
        },
        {
          id: "account-management",
          name: "Account Management",
          description: "Manage chart of accounts and financial accounts",
          isActive: true,
          isCore: true
        },
        {
          id: "transaction-management",
          name: "Transaction Management",
          description: "Record and track all financial transactions",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Sales & Revenue",
      modules: [
        {
          id: "sales-management",
          name: "Sales Management",
          description: "Track sales orders, invoices, and customer payments",
          isActive: false
        },
        {
          id: "invoicing",
          name: "Invoicing & Billing",
          description: "Create and manage invoices and billing cycles",
          isActive: false
        },
        {
          id: "customer-management",
          name: "Customer Management",
          description: "Manage customer accounts and credit terms",
          isActive: false
        },
        {
          id: "payment-processing",
          name: "Payment Processing",
          description: "Process and track customer payments and receipts",
          isActive: false
        }
      ]
    },
    {
      category: "Purchasing & Expenses",
      modules: [
        {
          id: "purchase-management",
          name: "Purchase Management",
          description: "Manage purchase orders and vendor transactions",
          isActive: false
        },
        {
          id: "expense-tracking",
          name: "Expense Tracking",
          description: "Track and categorize business expenses",
          isActive: false
        },
        {
          id: "supplier-management",
          name: "Supplier Management",
          description: "Manage supplier accounts and payment terms",
          isActive: false
        },
        {
          id: "vendor-payments",
          name: "Vendor Payments",
          description: "Process and track payments to suppliers",
          isActive: false
        }
      ]
    },
    {
      category: "Reporting & Analytics",
      modules: [
        {
          id: "financial-reports",
          name: "Financial Reports",
          description: "Generate P&L, balance sheets, and cash flow reports",
          isActive: false
        },
        {
          id: "budget-planning",
          name: "Budget Planning",
          description: "Create and manage budgets and forecasts",
          isActive: false
        },
        {
          id: "financial-analytics",
          name: "Financial Analytics",
          description: "Advanced analytics and performance insights",
          isActive: false
        },
        {
          id: "tax-reporting",
          name: "Tax Reporting",
          description: "Generate tax reports and compliance documents",
          isActive: false
        }
      ]
    },
    {
      category: "Advanced Features",
      modules: [
        {
          id: "multi-currency",
          name: "Multi-Currency",
          description: "Handle transactions in multiple currencies",
          isActive: false
        },
        {
          id: "banking-integration",
          name: "Banking Integration",
          description: "Connect with banks for automated reconciliation",
          isActive: false
        },
        {
          id: "audit-trail",
          name: "Audit Trail",
          description: "Comprehensive audit logs and compliance tracking",
          isActive: false
        },
        {
          id: "automated-workflows",
          name: "Automated Workflows",
          description: "Automate recurring financial processes",
          isActive: false
        }
      ]
    }
  ]
};

const FinanceModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<FinanceModuleConfig>(financeModuleConfig);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState<{
    submoduleId?: string;
    newState: boolean;
  } | null>(null);

  const handleModuleToggle = (newState: boolean) => {
    setPendingChange({ newState });
    setDialogOpen(true);
  };

  const handleSubmoduleToggle = (submoduleId: string, newState: boolean) => {
    setPendingChange({ submoduleId, newState });
    setDialogOpen(true);
  };

  const confirmChange = () => {
    if (!pendingChange) return;
    
    if (!pendingChange.submoduleId) {
      // Main module toggle
      setModuleConfig(prev => ({
        ...prev,
        isActive: pendingChange.newState,
        // If deactivating, deactivate all non-core submodules
        submodules: prev.submodules.map(category => ({
          ...category,
          modules: category.modules.map(submodule => ({
            ...submodule,
            isActive: pendingChange.newState ? 
              submodule.isActive : 
              submodule.isCore || false
          }))
        }))
      }));
    } else {
      // Submodule toggle
      setModuleConfig(prev => ({
        ...prev,
        submodules: prev.submodules.map(category => ({
          ...category,
          modules: category.modules.map(submodule => 
            submodule.id === pendingChange.submoduleId
              ? { ...submodule, isActive: pendingChange.newState }
              : submodule
          )
        }))
      }));
    }
    
    setDialogOpen(false);
    setPendingChange(null);
  };

  const cancelChange = () => {
    setDialogOpen(false);
    setPendingChange(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Core Features":
        return <DollarSign className="h-4 w-4" />;
      case "Sales & Revenue":
        return <TrendingUp className="h-4 w-4" />;
      case "Purchasing & Expenses":
        return <CreditCard className="h-4 w-4" />;
      case "Reporting & Analytics":
        return <BarChart3 className="h-4 w-4" />;
      case "Advanced Features":
        return <Zap className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Finance Module Access Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <CardTitle className="text-lg">{moduleConfig.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {moduleConfig.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={moduleConfig.isActive ? "default" : "secondary"}>
                      {moduleConfig.isActive ? (
                        <><Check className="h-3 w-3 mr-1" /> Active</>
                      ) : (
                        <><X className="h-3 w-3 mr-1" /> Inactive</>
                      )}
                    </Badge>
                    <Switch
                      checked={moduleConfig.isActive}
                      onCheckedChange={(checked) => handleModuleToggle(checked)}
                    />
                  </div>
                </div>
              </CardHeader>
              
              {moduleConfig.isActive && (
                <CardContent className="pt-0">
                  <Accordion type="multiple" className="w-full">
                    {moduleConfig.submodules.map((category, categoryIndex) => (
                      <AccordionItem key={categoryIndex} value={`category-${categoryIndex}`}>
                        <AccordionTrigger className="text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(category.category)}
                            {category.category}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            {category.modules.map((submodule) => (
                              <div
                                key={submodule.id}
                                className="flex items-center justify-between p-3 rounded-lg border bg-card"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-sm">{submodule.name}</h4>
                                    {submodule.isCore && (
                                      <Badge variant="outline" className="text-xs">
                                        Core
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {submodule.description}
                                  </p>
                                </div>
                                <Switch
                                  checked={submodule.isActive}
                                  disabled={submodule.isCore}
                                  onCheckedChange={(checked) => 
                                    handleSubmoduleToggle(submodule.id, checked)
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              )}
            </Card>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Module Change</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingChange?.submoduleId ? 
                `Are you sure you want to ${pendingChange.newState ? 'activate' : 'deactivate'} this submodule?` :
                `Are you sure you want to ${pendingChange?.newState ? 'activate' : 'deactivate'} this module? This will affect all its submodules.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmChange}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FinanceModuleAccessCenter;