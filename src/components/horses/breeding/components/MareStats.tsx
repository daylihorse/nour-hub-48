
import { Card, CardContent } from "@/components/ui/card";
import { Baby, Heart, Calendar } from "lucide-react";

const MareStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <Baby className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">7</div>
          <p className="text-sm text-muted-foreground">Pregnant Mares</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Heart className="h-6 w-6 text-pink-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">3</div>
          <p className="text-sm text-muted-foreground">Nursing Mares</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Calendar className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">12</div>
          <p className="text-sm text-muted-foreground">Open Mares</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold">22</div>
          <p className="text-sm text-muted-foreground">Total Mares</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MareStats;
