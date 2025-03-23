"use client";
import { Search } from "lucide-react";

type SearchFormProps = {
  city: string;
  setCity: (value: string) => void;
};

export function SearchForm({ city, setCity }: SearchFormProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="relative">
        <input
          className="pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm "
          type="text"
          placeholder="Search location by city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
    </form>
  );
}
