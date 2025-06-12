
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, DollarSign, Plus, Star } from "lucide-react";

const PublicLessonsManagement = () => {
  const lessonTypes = [
    {
      id: 1,
      name: "Beginner Group Lesson",
      duration: "60 minutes",
      maxStudents: 6,
      currentStudents: 4,
      price: 45,
      level: "Beginner",
      description: "Perfect for first-time riders and those new to horseback riding",
      schedule: ["Mon 10:00", "Wed 10:00", "Fri 10:00", "Sat 09:00", "Sun 09:00"]
    },
    {
      id: 2,
      name: "Private Lesson",
      duration: "60 minutes",
      maxStudents: 1,
      currentStudents: 1,
      price: 85,
      level: "All Levels",
      description: "One-on-one instruction tailored to individual needs",
      schedule: ["Available by appointment"]
    },
    {
      id: 3,
      name: "Intermediate Group",
      duration: "75 minutes",
      maxStudents: 4,
      currentStudents: 3,
      price: 55,
      level: "Intermediate",
      description: "For riders with basic experience looking to improve",
      schedule: ["Tue 14:00", "Thu 14:00", "Sat 11:00"]
    },
    {
      id: 4,
      name: "Advanced Training",
      duration: "90 minutes",
      maxStudents: 3,
      currentStudents: 2,
      price: 120,
      level: "Advanced",
      description: "Competitive training and advanced techniques",
      schedule: ["Mon 16:00", "Wed 16:00", "Fri 16:00"]
    }
  ];

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Beginner':
        return <Badge className="bg-green-100 text-green-800">Beginner</Badge>;
      case 'Intermediate':
        return <Badge className="bg-yellow-100 text-yellow-800">Intermediate</Badge>;
      case 'Advanced':
        return <Badge className="bg-red-100 text-red-800">Advanced</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getOccupancyColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Public Lessons Management</h2>
          <p className="text-muted-foreground">
            Manage lesson types, schedules, and student enrollment
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Lesson Type
        </Button>
      </div>

      {/* Lesson Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lessonTypes.map((lesson) => (
          <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{lesson.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    {getLevelBadge(lesson.level)}
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {lesson.duration}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">${lesson.price}</p>
                  <p className="text-sm text-muted-foreground">per lesson</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{lesson.description}</p>
              
              {/* Enrollment Status */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Enrollment</span>
                  <span className={`text-sm font-bold ${getOccupancyColor(lesson.currentStudents, lesson.maxStudents)}`}>
                    {lesson.currentStudents}/{lesson.maxStudents} students
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(lesson.currentStudents / lesson.maxStudents) * 100}%` }}
                  />
                </div>
              </div>

              {/* Schedule */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Schedule</h4>
                <div className="flex flex-wrap gap-1">
                  {lesson.schedule.map((time, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Manage Students
                </Button>
                <Button size="sm" variant="outline">
                  Edit Lesson
                </Button>
                <Button size="sm" variant="outline">
                  <Star className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Total Students</p>
                <p className="text-lg font-bold">
                  {lessonTypes.reduce((sum, lesson) => sum + lesson.currentStudents, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Lesson Types</p>
                <p className="text-lg font-bold">{lessonTypes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Avg Price</p>
                <p className="text-lg font-bold">
                  ${Math.round(lessonTypes.reduce((sum, lesson) => sum + lesson.price, 0) / lessonTypes.length)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Capacity Used</p>
                <p className="text-lg font-bold">
                  {Math.round((lessonTypes.reduce((sum, lesson) => sum + lesson.currentStudents, 0) / 
                              lessonTypes.reduce((sum, lesson) => sum + lesson.maxStudents, 0)) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicLessonsManagement;
