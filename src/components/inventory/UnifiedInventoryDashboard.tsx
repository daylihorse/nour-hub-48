
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, RefreshCw, Package, ShoppingCart, Stethoscope, Globe } from 'lucide-react';
import { EnhancedInventoryItem } from '@/types/inventory-integration';

const UnifiedInventoryDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedBusinessType, setSelectedBusinessType] = useState('all');

  // Mock stats
  const stats = {
    totalItems: 1247,
    medicalItems: 156,
    forSaleItems: 892,
    lowStockItems: 23,
    syncedToPharmacy: 156,
    syncedToStore: 634,
    syncedToMarketplace: 445
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'inventory':
        return <Package className="h-4 w-4" />;
      case 'pharmacy':
        return <Stethoscope className="h-4 w-4" />;
      case 'store':
        return <ShoppingCart className="h-4 w-4" />;
      case 'marketplace':
        return <Globe className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            Unified Inventory Dashboard
          </CardTitle>
          <CardDescription>
            Centralized view of all inventory items across modules
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.totalItems.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.medicalItems}</div>
            <p className="text-xs text-muted-foreground">Medical Items</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.forSaleItems}</div>
            <p className="text-xs text-muted-foreground">For Sale</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Low Stock</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-1">
              <Stethoscope className="h-4 w-4" />
              <div className="text-lg font-bold">{stats.syncedToPharmacy}</div>
            </div>
            <p className="text-xs text-muted-foreground">Pharmacy</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-1">
              <ShoppingCart className="h-4 w-4" />
              <div className="text-lg font-bold">{stats.syncedToStore}</div>
            </div>
            <p className="text-xs text-muted-foreground">Store</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <div className="text-lg font-bold">{stats.syncedToMarketplace}</div>
            </div>
            <p className="text-xs text-muted-foreground">Marketplace</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search inventory items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="medical">Medical Items</SelectItem>
                <SelectItem value="for_sale">For Sale</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Business Types</SelectItem>
                <SelectItem value="stable_owner">Stable Owner</SelectItem>
                <SelectItem value="pharmacy_owner">Pharmacy Owner</SelectItem>
                <SelectItem value="mixed_business">Mixed Business</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sync Activity</CardTitle>
          <CardDescription>Latest synchronization events across modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { item: 'Banamine Injectable', module: 'pharmacy', status: 'success', time: '2 minutes ago' },
              { item: 'Horse Feed Supplement', module: 'store', status: 'success', time: '5 minutes ago' },
              { item: 'Vitamin B Complex', module: 'marketplace', status: 'failed', time: '8 minutes ago' },
              { item: 'Joint Supplement', module: 'pharmacy', status: 'success', time: '12 minutes ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  {getModuleIcon(activity.module)}
                  <div>
                    <p className="font-medium">{activity.item}</p>
                    <p className="text-sm text-muted-foreground">Synced to {activity.module}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={activity.status === 'success' ? 'default' : 'destructive'}>
                    {activity.status === 'success' ? 'Success' : 'Failed'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnifiedInventoryDashboard;
