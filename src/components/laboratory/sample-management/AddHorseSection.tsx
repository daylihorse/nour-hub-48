
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { calculateAge } from "@/components/horses/utils/ageCalculation";

const AddHorseSection = () => {
  const [horseName, setHorseName] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [gender, setGender] = useState("");
  const [idChip, setIdChip] = useState("");
  const [functionalSpec, setFunctionalSpec] = useState("");
  const [ownerName, setOwnerName] = useState("");

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Horse Name *</Label>
        <Input
          placeholder="Enter horse name"
          value={horseName}
          onChange={(e) => setHorseName(e.target.value)}
        />
      </div>

      <div>
        <Label>Birth Date</Label>
        <DatePicker
          date={birthDate}
          onDateChange={setBirthDate}
          placeholder="Select birth date"
        />
        {birthDate && (
          <div className="text-sm text-muted-foreground mt-1">
            <span className="font-medium">Age: </span>
            {calculateAge(birthDate)}
          </div>
        )}
      </div>

      <div>
        <Label>Gender</Label>
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stallion">Stallion</SelectItem>
            <SelectItem value="mare">Mare</SelectItem>
            <SelectItem value="gelding">Gelding</SelectItem>
            <SelectItem value="colt">Colt</SelectItem>
            <SelectItem value="filly">Filly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>ID Chip/Passport Number</Label>
        <Input
          placeholder="Enter ID chip or passport number"
          value={idChip}
          onChange={(e) => setIdChip(e.target.value)}
        />
      </div>

      <div>
        <Label>Functional Specifications</Label>
        <Select value={functionalSpec} onValueChange={setFunctionalSpec}>
          <SelectTrigger>
            <SelectValue placeholder="Select specification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="racing">Racing</SelectItem>
            <SelectItem value="breeding">Breeding</SelectItem>
            <SelectItem value="show_jumping">Show Jumping</SelectItem>
            <SelectItem value="dressage">Dressage</SelectItem>
            <SelectItem value="endurance">Endurance</SelectItem>
            <SelectItem value="pleasure">Pleasure</SelectItem>
            <SelectItem value="therapy">Therapy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Owner Name</Label>
        <Input
          placeholder="Enter owner name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddHorseSection;
