
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import ArabicAddHorseForm from "./ArabicAddHorseForm";
import { HorseFormData } from "@/types/horse";
import { useToast } from "@/hooks/use-toast";

const HorseManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Mock data for existing horses
  const horses = [
    {
      id: "1",
      name: "Thunder",
      breed: "Arabian",
      gender: "stallion",
      owner: "John Smith",
      status: "active"
    },
    {
      id: "2", 
      name: "Lightning",
      breed: "Thoroughbred",
      gender: "mare",
      owner: "Sarah Johnson",
      status: "active"
    }
  ];

  const handleSaveHorse = async (data: HorseFormData) => {
    try {
      // Here you would typically save to a database
      console.log("Saving horse data:", data);
      
      toast({
        title: "نجح!",
        description: `تم تسجيل ${data.name} بنجاح.`,
      });
      
      setShowAddForm(false);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تسجيل الحصان. حاول مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  if (showAddForm) {
    return (
      <ArabicAddHorseForm 
        onSave={handleSaveHorse}
        onCancel={handleCancelAdd}
      />
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-right">
          <h2 className="text-2xl font-bold">سجل الخيول</h2>
          <p className="text-muted-foreground">إدارة جميع الخيول في الإسطبل</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          إضافة حصان جديد
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="البحث عن الخيول بالاسم أو السلالة أو المالك..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                  dir="rtl"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              فلاتر
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Horse List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {horses.map((horse) => (
          <Card key={horse.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-right">
                <span className="text-sm font-normal text-muted-foreground">
                  {horse.gender}
                </span>
                <span>{horse.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-right">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{horse.breed}</span>
                  <span className="text-muted-foreground">:السلالة</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{horse.owner}</span>
                  <span className="text-muted-foreground">:المالك</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{horse.status}</span>
                  <span className="text-muted-foreground">:الحالة</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  تعديل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HorseManagement;
