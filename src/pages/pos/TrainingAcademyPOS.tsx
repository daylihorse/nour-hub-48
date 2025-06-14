
import RidingPOS from "@/components/training-academy/RidingPOS";

const TrainingAcademyPOS = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Horse Riding Academy - Point of Sale</h1>
          <p className="text-muted-foreground">
            Complete riding experience sales and reservations
          </p>
        </div>
        <RidingPOS />
      </div>
    </div>
  );
};

export default TrainingAcademyPOS;
