interface SunInfoProps {
  sunrise: number;
  sunset: number;
}

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
    <div className="text-right p-6 text-sm text-gray-600">
      <p>
        Sun ☀️: {sunriseDate.getHours()}:
        {String(sunriseDate.getMinutes()).padStart(2, "0")} -{" "}
        {sunsetDate.getHours()}:
        {String(sunsetDate.getMinutes()).padStart(2, "0")} (10h 06m)
      </p>
      <p>
        {dayNames[today.getDay()]}, {monthNames[today.getMonth()]}{" "}
        {today.getDate()} {today.getFullYear()}
      </p>
    </div>
  );
}
