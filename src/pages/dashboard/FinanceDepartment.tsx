
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinanceDashboard from "@/components/finance/FinanceDashboard";
import PurchaseManagement from "@/components/finance/PurchaseManagement";
import SalesManagement from "@/components/finance/SalesManagement";
import CustomerSupplierManagement from "@/components/finance/CustomerSupplierManagement";
import AccountManagement from "@/components/finance/AccountManagement";
import FinancialReports from "@/components/finance/FinancialReports";
import CompanySettings from "@/components/finance/CompanySettings";

const FinanceDepartment = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Finance Department</h1>
        <p className="text-muted-foreground">Comprehensive financial management system</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <FinanceDashboard />
        </TabsContent>
        
        <TabsContent value="purchases" className="mt-6">
          <PurchaseManagement />
        </TabsContent>
        
        <TabsContent value="sales" className="mt-6">
          <SalesManagement />
        </TabsContent>
        
        <TabsContent value="customers" className="mt-6">
          <CustomerSupplierManagement />
        </TabsContent>
        
        <TabsContent value="accounts" className="mt-6">
          <AccountManagement />
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <FinancialReports />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <CompanySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceDepartment;
