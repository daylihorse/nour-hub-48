
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import DynamicSelect from "../form-components/DynamicSelect";
import { trainingLevelOptions } from "../form-components/constants/formOptions";
import { HorseFormValues } from "../form-schema/HorseFormSchema";

const TrainingPerformanceStage = () => {
  const form = useFormContext<HorseFormValues>();
  const [newDiscipline, setNewDiscipline] = useState("");
  const [newCompetition, setNewCompetition] = useState("");
  const [newAchievement, setNewAchievement] = useState("");

  const addDiscipline = () => {
    if (newDiscipline.trim()) {
      const currentDisciplines = form.getValues("disciplines") || [];
      form.setValue("disciplines", [...currentDisciplines, newDiscipline.trim()]);
      setNewDiscipline("");
    }
  };

  const removeDiscipline = (index: number) => {
    const currentDisciplines = form.getValues("disciplines") || [];
    form.setValue("disciplines", currentDisciplines.filter((_, i) => i !== index));
  };

  const addCompetition = () => {
    if (newCompetition.trim()) {
      const currentCompetitions = form.getValues("competitionHistory") || [];
      form.setValue("competitionHistory", [...currentCompetitions, newCompetition.trim()]);
      setNewCompetition("");
    }
  };

  const removeCompetition = (index: number) => {
    const currentCompetitions = form.getValues("competitionHistory") || [];
    form.setValue("competitionHistory", currentCompetitions.filter((_, i) => i !== index));
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      const currentAchievements = form.getValues("achievements") || [];
      form.setValue("achievements", [...currentAchievements, newAchievement.trim()]);
      setNewAchievement("");
    }
  };

  const removeAchievement = (index: number) => {
    const currentAchievements = form.getValues("achievements") || [];
    form.setValue("achievements", currentAchievements.filter((_, i) => i !== index));
  };

  const disciplines = form.watch("disciplines") || [];
  const competitions = form.watch("competitionHistory") || [];
  const achievements = form.watch("achievements") || [];

  return (
    <div className="space-y-6">
      <DynamicSelect
        name="trainingLevel"
        label="Training Level"
        placeholder="Select training level"
        options={trainingLevelOptions}
        required
      />

      <div className="space-y-4">
        <div>
          <FormLabel>Disciplines</FormLabel>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Add discipline (e.g., Dressage, Show Jumping)"
              value={newDiscipline}
              onChange={(e) => setNewDiscipline(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addDiscipline())}
            />
            <Button type="button" onClick={addDiscipline} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {disciplines.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {disciplines.map((discipline, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {discipline}
                  <button
                    type="button"
                    onClick={() => removeDiscipline(index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div>
          <FormLabel>Competition History</FormLabel>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Add competition"
              value={newCompetition}
              onChange={(e) => setNewCompetition(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCompetition())}
            />
            <Button type="button" onClick={addCompetition} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {competitions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {competitions.map((competition, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {competition}
                  <button
                    type="button"
                    onClick={() => removeCompetition(index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div>
          <FormLabel>Achievements</FormLabel>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Add achievement"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAchievement())}
            />
            <Button type="button" onClick={addAchievement} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {achievements.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {achievements.map((achievement, index) => (
                <Badge key={index} variant="default" className="flex items-center gap-1">
                  {achievement}
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="ml-1 hover:text-primary-foreground/70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingPerformanceStage;
