
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserCheck, Star, Calendar, Award, Phone, Mail, Plus } from "lucide-react";

const InstructorManagement = () => {
  const instructors = [
    {
      id: 1,
      name: "Sarah Johnson",
      specializations: ["Beginner Training", "Dressage", "Children's Lessons"],
      experience: "8 years",
      rating: 4.9,
      totalLessons: 450,
      availability: "Mon-Fri",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@academy.com",
      certifications: ["British Horse Society Level 3", "First Aid Certified"],
      status: "active"
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      specializations: ["Jumping", "Competition Prep", "Advanced Training"],
      experience: "12 years",
      rating: 4.8,
      totalLessons: 680,
      availability: "Tue-Sat",
      phone: "+1 (555) 234-5678",
      email: "mike.rodriguez@academy.com",
      certifications: ["USDF Gold Medalist", "Certified Jumping Instructor"],
      status: "active"
    },
    {
      id: 3,
      name: "Emma Wilson",
      specializations: ["Trial Lessons", "Beginner Adults", "Therapeutic Riding"],
      experience: "5 years",
      rating: 4.7,
      totalLessons: 320,
      availability: "Wed-Sun",
      phone: "+1 (555) 345-6789",
      email: "emma.wilson@academy.com",
      certifications: ["PATH Intl. Certified", "Mental Health First Aid"],
      status: "active"
    },
    {
      id: 4,
      name: "James Foster",
      specializations: ["Western Riding", "Trail Training", "Horse Care"],
      experience: "15 years",
      rating: 4.6,
      totalLessons: 890,
      availability: "Mon-Thu",
      phone: "+1 (555) 456-7890",
      email: "james.foster@academy.com",
      certifications: ["Western Horsemanship Instructor", "Equine First Aid"],
      status: "on_leave"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'on_leave':
        return <Badge className="bg-yellow-100 text-yellow-800">On Leave</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Instructor Management</h2>
          <p className="text-muted-foreground">
            Manage instructor profiles, schedules, and performance
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Instructor
        </Button>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {instructors.map((instructor) => (
          <Card key={instructor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg font-bold">
                    {getInitials(instructor.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{instructor.name}</h3>
                      <p className="text-muted-foreground">{instructor.experience} experience</p>
                    </div>
                    {getStatusBadge(instructor.status)}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{instructor.rating}</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {instructor.totalLessons} lessons taught
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Specializations */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-1">
                  {instructor.specializations.map((spec, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span>{instructor.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span>{instructor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span>Available: {instructor.availability}</span>
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Certifications</h4>
                <div className="space-y-1">
                  {instructor.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <Award className="h-3 w-3 text-green-600" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  View Schedule
                </Button>
                <Button size="sm" variant="outline">
                  Edit Profile
                </Button>
                <Button size="sm" variant="outline">
                  <UserCheck className="h-3 w-3" />
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
              <UserCheck className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Active Instructors</p>
                <p className="text-lg font-bold">
                  {instructors.filter(i => i.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
                <p className="text-lg font-bold">
                  {(instructors.reduce((sum, i) => sum + i.rating, 0) / instructors.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Total Lessons</p>
                <p className="text-lg font-bold">
                  {instructors.reduce((sum, i) => sum + i.totalLessons, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Certifications</p>
                <p className="text-lg font-bold">
                  {instructors.reduce((sum, i) => sum + i.certifications.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstructorManagement;
