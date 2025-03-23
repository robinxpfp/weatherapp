import { LucideIcon } from "lucide-react";

type WeatherCardProps = {
  title: string;
  value: string | number;
  description: string | React.ReactNode;
  icon: LucideIcon;
  progress?: {
    value: number;
    minLabel: string;
    maxLabel: string;
    color: string;
  };
  extraInfo?: {
    label: string;
    dotColor: string;
  };
};

export function WeatherCard({
  title,
  value,
  description,
  icon: Icon,
  progress,
  extraInfo,
}: WeatherCardProps) {
  return (
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
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500">{progress.minLabel}</span>
          <div className="h-1 w-24 bg-gray-200 rounded-full">
            <div
              className={`h-1 ${progress.color} rounded-full`}
              style={{ width: `${progress.value}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500">{progress.maxLabel}</span>
        </div>
      )}
      {extraInfo && (
        <div className="mt-4 flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${extraInfo.dotColor}`}></div>
          <span className="text-xs text-gray-500">{extraInfo.label}</span>
        </div>
      )}
    </div>
  );
}
