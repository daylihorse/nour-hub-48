
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TeamSetupProps {
  data?: any;
  onUpdate: (team: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const TeamSetup = ({ data = {}, onUpdate, onNext, onBack }: TeamSetupProps) => {
  const [teamData, setTeamData] = useState({
    ownerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      role: 'owner',
      ...data.ownerInfo
    },
    additionalMembers: data.additionalMembers || []
  });

  const handleOwnerInfoChange = (field: string, value: string) => {
    const updated = {
      ...teamData,
      ownerInfo: { ...teamData.ownerInfo, [field]: value }
    };
    setTeamData(updated);
    onUpdate(updated);
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={teamData.ownerInfo.firstName}
              onChange={(e) => handleOwnerInfoChange('firstName', e.target.value)}
              placeholder="Your first name"
            />
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={teamData.ownerInfo.lastName}
              onChange={(e) => handleOwnerInfoChange('lastName', e.target.value)}
              placeholder="Your last name"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={teamData.ownerInfo.email}
              onChange={(e) => handleOwnerInfoChange('email', e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamSetup;
