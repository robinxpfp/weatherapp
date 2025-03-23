import { Clock3 } from "lucide-react";
import { SearchForm } from "@/components/search-form";

type SearchFormProps = {
  city: string;
  setCity: (value: string) => void;
};

export function Nav({ city, setCity }: SearchFormProps) {
  return (
    <div className="flex items-center justify-between p-6 sm:border-b sm:border-gray-100 flex-col sm:flex-row gap-8">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
          <Clock3 className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold">TimeSpot</span>
      </div>
      <SearchForm city={city} setCity={setCity} />
    </div>
  );
}
