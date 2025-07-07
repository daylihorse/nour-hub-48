
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
  key: string;
}

export const menuItems: MenuItem[] = [
  { 
    title: "Overview", 
    url: "/dashboard", 
    icon: BarChart3,
    key: "dashboard"
  },
  { 
    title: "Horses Department", 
    url: "/dashboard/horses", 
    icon: Rabbit,
    key: "horses"
  },
  { 
    title: "Paddock Management", 
    url: "/dashboard/paddocks", 
    icon: MapPin,
    key: "paddocks"
  },
  { 
    title: "Clients", 
    url: "/dashboard/clients", 
    icon: UserCheck,
    key: "clients"
  },
  { 
    title: "Laboratory", 
    url: "/dashboard/laboratory", 
    icon: FlaskRound,
    key: "laboratory"
  },
  { 
    title: "Clinic", 
    url: "/dashboard/clinic", 
    icon: Hospital,
    key: "clinic"
  },
  { 
    title: "Pharmacy", 
    url: "/dashboard/pharmacy", 
    icon: Pill,
    key: "pharmacy"
  },
  { 
    title: "Finance", 
    url: "/dashboard/finance", 
    icon: DollarSign,
    key: "finance"
  },
  { 
    title: "HR Department", 
    url: "/dashboard/hr", 
    icon: Users,
    key: "hr"
  },
  { 
    title: "Inventory & Warehouse", 
    url: "/dashboard/inventory", 
    icon: Package,
    key: "inventory"
  },
  { 
    title: "Marketplace", 
    url: "/dashboard/marketplace", 
    icon: Store,
    key: "marketplace"
  },
  { 
    title: "Horse Movements", 
    url: "/dashboard/movements", 
    icon: ArrowRightLeft,
    key: "movements"
  },
  { 
    title: "Training Center", 
    url: "/dashboard/training", 
    icon: Dumbbell,
    key: "training"
  },
  { 
    title: "Riding Reservations", 
    url: "/dashboard/academy", 
    icon: Rabbit,
    key: "academy"
  },
  { 
    title: "Stable Rooms", 
    url: "/dashboard/rooms", 
    icon: Warehouse,
    key: "stable_rooms"
  },
  { 
    title: "Maintenance", 
    url: "/dashboard/maintenance", 
    icon: Wrench,
    key: "maintenance"
  },
  { 
    title: "Messages", 
    url: "/dashboard/messages", 
    icon: MessageSquare,
    key: "messages"
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    key: "tenant_settings"
  }
];
