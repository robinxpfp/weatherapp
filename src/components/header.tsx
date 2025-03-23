"use client";

import { SearchForm } from "@/components/search-form";

type HeaderProps = {
  city: string;
  setCity: (value: string) => void;
};

export function Header({ city, setCity }: HeaderProps) {
  return <SearchForm city={city} setCity={setCity} />;
}
