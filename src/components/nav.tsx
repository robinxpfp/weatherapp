import { Clock3 } from "lucide-react";
import { SearchForm } from "@/components/search-form";
import { ModeToggle } from "./mode-toggle";

type SearchFormProps = {
  city: string;
  setCity: (value: string) => void;
};

export function Nav({ city, setCity }: SearchFormProps) {
  return (
    <header className="flex items-center justify-between p-4 sm:p-8 sm:mb-4 mb-12">
      <div className="flex items-center gap-2 font-semibold">
        <ModeToggle />
        <span>TimeSpot</span>
      </div>
      <SearchForm city={city} setCity={setCity} />
    </header>
  );
}
