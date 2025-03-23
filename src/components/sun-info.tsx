type SunInfoProps = {
  sunrise: number;
  sunset: number;
};

export function SunInfo({ sunrise, sunset }: SunInfoProps) {
  const today = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="text-center opacity-70">
      {dayNames[today.getDay()]}, {monthNames[today.getMonth()]}{" "}
      {today.getDate()} {today.getFullYear()}
    </div>
  );
}
