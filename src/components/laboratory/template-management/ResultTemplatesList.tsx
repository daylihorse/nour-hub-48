
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Copy, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResultTemplatesListProps {
  searchTerm: string;
}

const ResultTemplatesList = ({ searchTerm }: ResultTemplatesListProps) => {
  // Mock data for result templates
  const templates = [
    {
      id: "1",
      nameEn: "Complete Blood Count",
      nameAr: "تعداد الدم الكامل",
      category: "Hematology",
      parametersCount: 12,
      normalRanges: "Age/Gender specific",
      lastModified: "2024-06-01",
      status: "active",
      usageCount: 156
    },
    {
      id: "2", 
      nameEn: "Liver Function Panel",
      nameAr: "فحص وظائف الكبد",
      category: "Clinical Chemistry",
      parametersCount: 8,
      normalRanges: "Standard adult",
      lastModified: "2024-05-28",
      status: "active",
      usageCount: 89
    },
    {
      id: "3",
      nameEn: "Thyroid Profile",
      nameAr: "ملف الغدة الدرقية", 
      category: "Endocrinology",
      parametersCount: 5,
      normalRanges: "Age specific",
      lastModified: "2024-05-15",
      status: "draft",
      usageCount: 0
    }
  ];

  const filteredTemplates = templates.filter(template =>
    template.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.nameAr.includes(searchTerm) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { variant: "default" as const, label: "Active" },
      draft: { variant: "secondary" as const, label: "Draft" },
      archived: { variant: "outline" as const, label: "Archived" }
    };
    
    return (
      <Badge variant={statusMap[status as keyof typeof statusMap]?.variant || "outline"}>
        {statusMap[status as keyof typeof statusMap]?.label || status}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Template Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Parameters</TableHead>
            <TableHead>Normal Ranges</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTemplates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{template.nameEn}</div>
                  <div className="text-sm text-muted-foreground" dir="rtl">
                    {template.nameAr}
                  </div>
                </div>
              </TableCell>
              <TableCell>{template.category}</TableCell>
              <TableCell>{template.parametersCount} parameters</TableCell>
              <TableCell>{template.normalRanges}</TableCell>
              <TableCell>{getStatusBadge(template.status)}</TableCell>
              <TableCell>{template.usageCount} times</TableCell>
              <TableCell>{template.lastModified}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultTemplatesList;
