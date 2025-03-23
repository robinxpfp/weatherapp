type SunInfoProps = {
  sunrise: number;
  sunset: number;
};

export function SunInfo({ sunrise, sunset }: SunInfoProps) {
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);
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
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-yellow-500">☀️</span>
        <span>
          {sunriseDate.getHours()}:
          {String(sunriseDate.getMinutes()).padStart(2, "0")} -{" "}
          {sunsetDate.getHours()}:
          {String(sunsetDate.getMinutes()).padStart(2, "0")} (10h 06m)
        </span>
      </div>
      <p className="text-gray-600">
        {dayNames[today.getDay()]}, {monthNames[today.getMonth()]}{" "}
        {today.getDate()} {today.getFullYear()}
      </p>
    </div>
  );
}
