import { LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
type WeatherCardProps = {
  title: string;
  value: string;
  description: string | React.ReactNode;
  icon: LucideIcon;
  progress?: number;
  extraInfo?: { label: string; dotColor: string };
};

export const WeatherCard = ({
  title,
  value,
  description,
  icon: Icon,
  progress,
  extraInfo,
}: WeatherCardProps) => (
  <div className="bg-white rounded-3xl shadow-sm p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        <h3 className="font-medium">{title}</h3>
      </div>
      <span className="text-xl font-bold">{value}</span>
    </div>
    <div className="text-gray-600 text-sm">{description}</div>
    {progress && (
      <div className="mt-4">
        <Progress value={progress} className="h-1 w-24" />
      </div>
    )}
    {extraInfo && (
      <div className="mt-4 flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${extraInfo.dotColor}`} />
        <span className="text-xs text-gray-500">{extraInfo.label}</span>
      </div>
    )}
  </div>
);
