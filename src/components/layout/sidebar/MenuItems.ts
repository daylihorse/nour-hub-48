
import { 
  Rabbit, 
  FlaskRound, 
  Hospital, 
  DollarSign, 
  Users, 
  Package, 
  ArrowRightLeft, 
  Warehouse, 
  Wrench,
  Store,
  MessageSquare,
  Pill,
  BarChart3,
  UserCheck,
  Settings,
  MapPin,
  Dumbbell,
  LucideIcon
} from "lucide-react";

export interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const menuItems: MenuItem[] = [
  { 
    title: "Overview", 
    url: "/dashboard", 
    icon: BarChart3 
  },
  { 
    title: "Horses Department", 
    url: "/dashboard/horses", 
    icon: Rabbit 
  },
  { 
    title: "Paddock Management", 
    url: "/dashboard/paddocks", 
    icon: MapPin 
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
    title: "Inventory & Warehouse", 
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
    title: "Riding Reservations", 
    url: "/dashboard/academy", 
    icon: Rabbit 
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
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings
  }
];
