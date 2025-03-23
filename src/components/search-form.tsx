import { Search } from "lucide-react";

type SearchFormProps = {
  city: string;
  setCity: (value: string) => void;
};

export function SearchForm({ city, setCity }: SearchFormProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        <input
          className="rounded-full border border-gray-200 pl-10 pr-4 py-2 w-[200px] focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
          type="text"
          placeholder="Search location by city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
    </form>
  );
}
