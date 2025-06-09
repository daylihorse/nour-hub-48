
import { 
  Rabbit, 
  FlaskRound, 
  Hospital, 
  DollarSign, 
  Users, 
  Package, 
  ArrowRightLeft, 
  Dumbbell, 
  Warehouse, 
  Wrench,
  Store,
  MessageSquare,
  Pill,
  BarChart3,
  UserCheck,
  LucideIcon
} from "lucide-react";

export interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const menuItems: MenuItem[] = [
  { 
    title: "Dashboard", 
    url: "/dashboard", 
    icon: BarChart3 
  },
  { 
    title: "Horses Department", 
    url: "/dashboard/horses", 
    icon: Rabbit 
  },
  { 
    title: "Clients", 
    url: "/dashboard/clients", 
    icon: UserCheck 
  },
  { 
    title: "Laboratory", 
    url: "/dashboard/laboratory", 
    icon: FlaskRound 
  },
  { 
    title: "Clinic", 
    url: "/dashboard/clinic", 
    icon: Hospital 
  },
  { 
    title: "Pharmacy", 
    url: "/dashboard/pharmacy", 
    icon: Pill 
  },
  { 
    title: "Finance", 
    url: "/dashboard/finance", 
    icon: DollarSign 
  },
  { 
    title: "HR Department", 
    url: "/dashboard/hr", 
    icon: Users 
  },
  { 
    title: "Inventory", 
    url: "/dashboard/inventory", 
    icon: Package 
  },
  { 
    title: "Marketplace", 
    url: "/dashboard/marketplace", 
    icon: Store 
  },
  { 
    title: "Horse Movements", 
    url: "/dashboard/movements", 
    icon: ArrowRightLeft 
  },
  { 
    title: "Training Center", 
    url: "/dashboard/training", 
    icon: Dumbbell 
  },
  { 
    title: "Stable Rooms", 
    url: "/dashboard/rooms", 
    icon: Warehouse 
  },
  { 
    title: "Maintenance", 
    url: "/dashboard/maintenance", 
    icon: Wrench 
  },
  { 
    title: "Messages", 
    url: "/dashboard/messages", 
    icon: MessageSquare 
  }
];
