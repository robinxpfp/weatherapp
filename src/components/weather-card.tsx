import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type WeatherCardProps = {
  title: string;
  value: string;
  description: string | React.ReactNode;
  icon: LucideIcon;
  progress?: {
    value: number;
    minLabel?: string;
    maxLabel?: string;
    color: string;
  };
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
  <Card>
    <CardHeader>
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <span className="text-2xl font-bold">{value}</span>
    </CardHeader>
    <CardContent>
      <div className=" text-sm mb-2">{description}</div>
      {progress && (
        <div className="mt-2">
          <Progress
            value={progress.value}
            indicatorClassName={progress.color}
          />
          {(progress.minLabel || progress.maxLabel) && (
            <div className="flex justify-between mt-1">
              <span className="text-xs ">{progress.minLabel}</span>
              <span className="text-xs ">{progress.maxLabel}</span>
            </div>
          )}
        </div>
      )}
      {extraInfo && (
        <div className="mt-2 gap-2">
          <div className={`h-2 w-2 rounded-full ${extraInfo.dotColor}`} />
          <span className="text-xs ">{extraInfo.label}</span>
        </div>
      )}
    </CardContent>
  </Card>
);
