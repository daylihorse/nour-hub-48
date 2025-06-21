
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Building2, Plus, X } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface TeamSetupProps {
  data?: OnboardingData['team'];
  onUpdate: (data: OnboardingData['team']) => void;
  onNext: () => void;
  onBack: () => void;
}

const TeamSetup = ({ data, onUpdate, onNext, onBack }: TeamSetupProps) => {
  const [teamData, setTeamData] = useState(data || {
    ownerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      role: 'owner'
    },
    additionalMembers: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableRoles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'manager', label: 'Manager' },
    { value: 'employee', label: 'Employee' },
    { value: 'viewer', label: 'Viewer' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!teamData.ownerInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!teamData.ownerInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!teamData.ownerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    }

    // Validate additional members
    teamData.additionalMembers.forEach((member, index) => {
      if (member.email && !member.firstName) {
        newErrors[`member_${index}_firstName`] = 'First name is required';
      }
      if (member.email && !member.lastName) {
        newErrors[`member_${index}_lastName`] = 'Last name is required';
      }
      if (member.firstName && !member.email) {
        newErrors[`member_${index}_email`] = 'Email is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onUpdate(teamData);
      onNext();
    }
  };

  const updateOwnerInfo = (field: string, value: string) => {
    setTeamData(prev => ({
      ...prev,
      ownerInfo: { ...prev.ownerInfo, [field]: value }
    }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTeamMember = () => {
    setTeamData(prev => ({
      ...prev,
      additionalMembers: [
        ...prev.additionalMembers,
        { firstName: '', lastName: '', email: '', role: 'employee' }
      ]
    }));
  };

  const removeTeamMember = (index: number) => {
    setTeamData(prev => ({
      ...prev,
      additionalMembers: prev.additionalMembers.filter((_, i) => i !== index)
    }));
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    setTeamData(prev => ({
      ...prev,
      additionalMembers: prev.additionalMembers.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    }));

    const errorKey = `member_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">EquiSense Setup</span>
        </div>
      </div>

      {/* Progress */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-semibold">
            ✓
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-semibold">
            ✓
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-semibold">
            ✓
          </div>
          <div className="w-16 h-1 bg-blue-600"></div>
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            4
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Set Up Your Team</h1>
        <p className="text-gray-600">Add team members who will have access to your EquiSense platform</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Owner Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Owner Information</CardTitle>
            <p className="text-sm text-gray-600">This will be the primary administrator account</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={teamData.ownerInfo.firstName}
                  onChange={(e) => updateOwnerInfo('firstName', e.target.value)}
                  placeholder="John"
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={teamData.ownerInfo.lastName}
                  onChange={(e) => updateOwnerInfo('lastName', e.target.value)}
                  placeholder="Doe"
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="ownerEmail">Email Address *</Label>
              <Input
                id="ownerEmail"
                type="email"
                value={teamData.ownerInfo.email}
                onChange={(e) => updateOwnerInfo('email', e.target.value)}
                placeholder="john@example.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Additional Team Members */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <p className="text-sm text-gray-600">Add additional team members (optional)</p>
              </div>
              <Button onClick={addTeamMember} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {teamData.additionalMembers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No additional team members added yet.</p>
                <p className="text-sm">You can always invite team members later from your dashboard.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {teamData.additionalMembers.map((member, index) => (
                  <div key={index} className="border rounded-lg p-4 relative">
                    <Button
                      onClick={() => removeTeamMember(index)}
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="space-y-4 pr-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`member_${index}_firstName`}>First Name</Label>
                          <Input
                            id={`member_${index}_firstName`}
                            value={member.firstName}
                            onChange={(e) => updateTeamMember(index, 'firstName', e.target.value)}
                            placeholder="First name"
                            className={errors[`member_${index}_firstName`] ? 'border-red-500' : ''}
                          />
                          {errors[`member_${index}_firstName`] && 
                            <p className="text-sm text-red-500 mt-1">{errors[`member_${index}_firstName`]}</p>
                          }
                        </div>
                        <div>
                          <Label htmlFor={`member_${index}_lastName`}>Last Name</Label>
                          <Input
                            id={`member_${index}_lastName`}
                            value={member.lastName}
                            onChange={(e) => updateTeamMember(index, 'lastName', e.target.value)}
                            placeholder="Last name"
                            className={errors[`member_${index}_lastName`] ? 'border-red-500' : ''}
                          />
                          {errors[`member_${index}_lastName`] && 
                            <p className="text-sm text-red-500 mt-1">{errors[`member_${index}_lastName`]}</p>
                          }
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`member_${index}_email`}>Email Address</Label>
                          <Input
                            id={`member_${index}_email`}
                            type="email"
                            value={member.email}
                            onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                            placeholder="email@example.com"
                            className={errors[`member_${index}_email`] ? 'border-red-500' : ''}
                          />
                          {errors[`member_${index}_email`] && 
                            <p className="text-sm text-red-500 mt-1">{errors[`member_${index}_email`]}</p>
                          }
                        </div>
                        <div>
                          <Label htmlFor={`member_${index}_role`}>Role</Label>
                          <Select value={member.role} onValueChange={(value) => updateTeamMember(index, 'role', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableRoles.map((role) => (
                                <SelectItem key={role.value} value={role.value}>
                                  {role.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700 px-8">
            Complete Setup
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamSetup;
