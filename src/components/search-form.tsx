import { Search } from "lucide-react";
import { Input } from "./ui/input";

type SearchFormProps = {
  city: string;
  setCity: (value: string) => void;
};

export function SearchForm({ city, setCity }: SearchFormProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4" />
        <Input
          className="pl-10 rounded-3xl"
          type="text"
          placeholder="Search location by city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
    </form>
  );
}
