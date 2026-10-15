import { TrendingUp, Heart, Users, Briefcase } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ImpactStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

export const impactStatsData: ImpactStat[] = [
  { icon: TrendingUp, value: "2,000+", label: "Lives Touched" },
  { icon: Heart, value: "12", label: "Active Partners" },
  { icon: Users, value: "100+", label: "Children Enrolled" },
  { icon: Briefcase, value: "50+", label: "Elderly Supported" },
];
