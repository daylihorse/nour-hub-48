import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { CalendarIcon, Search, FileDown, FileUp, FileSpreadsheet } from "lucide-react";

const LaboratoryDepartment = () => {
  const [activeTab, setActiveTab] = useState("all-samples");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [breadcrumb, setBreadcrumb] = useState("Home / View All Samples");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch (value) {
      case "all-samples":
        setBreadcrumb("Home / View All Samples");
        break;
      case "unreceived":
        setBreadcrumb("Home / Unreceived Samples");
        break;
      case "received":
        setBreadcrumb("Home / Received Samples");
        break;
      case "today":
        setBreadcrumb("Home / Today's Samples");
        break;
      case "retest":
        setBreadcrumb("Home / Retest Samples");
        break;
      default:
        setBreadcrumb("Home / View All Samples");
    }
  };

  const sampleData = [
    {
      id: 1,
      horseName: "Thunder",
      breedingType: "N/A",
      clientName: "Ahmed Hassan",
      accountType: "Individual",
      dataSharing: "No",
      analysisType: "Blood Profile",
      sampleStatus: "Complete",
      sampleReceiving: "Complete",
      staff: "Not Assigned",
      paymentStatus: "Paid",
      orderMethod: "Lab Reception",
      orderDate: new Date("2023-05-10"),
      delivery: "Not Yet"
    },
    {
      id: 2,
      horseName: "Bella",
      breedingType: "N/A",
      clientName: "Sara Ahmed",
      accountType: "Individual",
      dataSharing: "No",
      analysisType: "Biochemistry",
      sampleStatus: "New",
      sampleReceiving: "Partial",
      staff: "Not Assigned",
      paymentStatus: "Partially Paid",
      orderMethod: "Lab Reception",
      orderDate: new Date("2023-06-15"),
      delivery: "Not Yet"
    },
    {
      id: 3,
      horseName: "Shadow",
      breedingType: "N/A",
      clientName: "Mohamed Ali",
      accountType: "Individual",
      dataSharing: "No",
      analysisType: "Hormone Analysis",
      sampleStatus: "Processing",
      sampleReceiving: "Partial",
      staff: "Not Assigned",
      paymentStatus: "Paid",
      orderMethod: "Lab Reception",
      orderDate: new Date("2023-04-01"),
      delivery: "Not Yet"
    },
    {
      id: 4,
      horseName: "Whisper",
      breedingType: "N/A",
      clientName: "Layla Mahmoud",
      accountType: "Individual",
      dataSharing: "No",
      analysisType: "Infectious Diseases",
      sampleStatus: "Retest",
      sampleReceiving: "Retest",
      staff: "Not Assigned",
      paymentStatus: "Paid",
      orderMethod: "Lab Reception",
      orderDate: new Date("2023-04-20"),
      delivery: "Not Yet"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800";
      case "Partial":
        return "bg-amber-100 text-amber-800";
      case "New":
        return "bg-amber-100 text-amber-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Retest":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Laboratory Department</h1>
        <p className="text-muted-foreground">Manage tests, samples, and results</p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{breadcrumb}</h2>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" /> PDF
              </Button>
              <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" /> Export
              </Button>
              <Button variant="outline" size="sm">
                <FileUp className="mr-2 h-4 w-4" /> Import
              </Button>
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all-samples">All Samples</TabsTrigger>
              <TabsTrigger value="unreceived">Unreceived</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
              <TabsTrigger value="today">Today's</TabsTrigger>
              <TabsTrigger value="retest">Retest</TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">From:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-[130px]">
                      {fromDate ? format(fromDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">To:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-[130px]">
                      {toDate ? format(toDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-1" />

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Search:</span>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Client Name"
                    className="pl-8 w-[200px]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="bg-background p-2 rounded-md border text-center">
                <div className="text-sm font-medium">Total Samples</div>
                <div className="text-lg font-bold text-primary">5</div>
              </div>
              <div className="bg-background p-2 rounded-md border text-center">
                <div className="text-sm font-medium">Received</div>
                <div className="text-lg font-bold text-primary">4</div>
              </div>
              <div className="bg-background p-2 rounded-md border text-center">
                <div className="text-sm font-medium">Unreceived</div>
                <div className="text-lg font-bold text-primary">1</div>
              </div>
              <div className="bg-background p-2 rounded-md border text-center">
                <div className="text-sm font-medium">Today</div>
                <div className="text-lg font-bold text-primary">0</div>
              </div>
              <div className="bg-background p-2 rounded-md border text-center">
                <div className="text-sm font-medium">Retest</div>
                <div className="text-lg font-bold text-primary">1</div>
              </div>
            </div>

            <TabsContent value="all-samples" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">No</TableHead>
                    <TableHead className="text-center">Horse</TableHead>
                    <TableHead className="text-center">Breeding</TableHead>
                    <TableHead className="text-center">Client</TableHead>
                    <TableHead className="text-center">Account</TableHead>
                    <TableHead className="text-center">Data Sharing</TableHead>
                    <TableHead className="text-center">Analysis</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Receiving</TableHead>
                    <TableHead className="text-center">Staff</TableHead>
                    <TableHead className="text-center">Payment</TableHead>
                    <TableHead className="text-center">Method</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Delivery</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleData.map((sample) => (
                    <TableRow key={sample.id}>
                      <TableCell className="text-center">{sample.id}</TableCell>
                      <TableCell className="text-center">{sample.horseName}</TableCell>
                      <TableCell className="text-center">{sample.breedingType}</TableCell>
                      <TableCell className="text-center">{sample.clientName}</TableCell>
                      <TableCell className="text-center">{sample.accountType}</TableCell>
                      <TableCell className="text-center">{sample.dataSharing}</TableCell>
                      <TableCell className="text-center">{sample.analysisType}</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(sample.sampleStatus)}`}>
                          {sample.sampleStatus}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(sample.sampleReceiving)}`}>
                          {sample.sampleReceiving}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">{sample.staff}</TableCell>
                      <TableCell className="text-center">{sample.paymentStatus}</TableCell>
                      <TableCell className="text-center">{sample.orderMethod}</TableCell>
                      <TableCell className="text-center">{format(sample.orderDate, "dd/MM/yyyy")}</TableCell>
                      <TableCell className="text-center">{sample.delivery}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Other tabs would follow the same pattern */}
            <TabsContent value="unreceived" className="m-0">
              {/* Filter data for unreceived samples */}
              <Table>
                {/* Same table structure but with filtered data */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">No</TableHead>
                    <TableHead className="text-center">Horse</TableHead>
                    {/* ... other headers ... */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Filtered data would go here */}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* ... other tabs content ... */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaboratoryDepartment;
