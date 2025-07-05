
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
    url: "/", 
    icon: BarChart3 
  },
  { 
    title: "Horses Department", 
    url: "/horses", 
    icon: Rabbit 
  },
  { 
    title: "Paddock Management", 
    url: "/paddocks", 
    icon: MapPin 
  },
  { 
    title: "Clients", 
    url: "/clients", 
    icon: UserCheck 
  },
  { 
    title: "Laboratory", 
    url: "/laboratory", 
    icon: FlaskRound 
  },
  { 
    title: "Clinic", 
    url: "/clinic", 
    icon: Hospital 
  },
  { 
    title: "Pharmacy", 
    url: "/pharmacy", 
    icon: Pill 
  },
  { 
    title: "Finance", 
    url: "/finance", 
    icon: DollarSign 
  },
  { 
    title: "HR Department", 
    url: "/hr", 
    icon: Users 
  },
  { 
    title: "Inventory & Warehouse", 
    url: "/inventory", 
    icon: Package 
  },
  { 
    title: "Marketplace", 
    url: "/marketplace", 
    icon: Store 
  },
  { 
    title: "Horse Movements", 
    url: "/movements", 
    icon: ArrowRightLeft 
  },
  { 
    title: "Training Center", 
    url: "/training", 
    icon: Dumbbell 
  },
  { 
    title: "Riding Reservations", 
    url: "/academy", 
    icon: Rabbit 
  },
  { 
    title: "Stable Rooms", 
    url: "/rooms", 
    icon: Warehouse 
  },
  { 
    title: "Maintenance", 
    url: "/maintenance", 
    icon: Wrench 
  },
  { 
    title: "Messages", 
    url: "/messages", 
    icon: MessageSquare 
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings
  }
];
