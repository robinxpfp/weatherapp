import { Clock3 } from "lucide-react";
import { SearchForm } from "@/components/search-form";

type SearchFormProps = {
  city: string;
  setCity: (value: string) => void;
};

export function Nav({ city, setCity }: SearchFormProps) {
  return (
    <header className="flex items-center justify-between p-4 md:p-8">
      <div className="flex items-center gap-2 font-semibold">
        <div className="w-8 h-8 rounded-full  flex items-center justify-center">
          <Clock3 />
        </div>
        <span>TimeSpot</span>
      </div>
      <SearchForm city={city} setCity={setCity} />
    </header>
  );
}
