import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Caretakers from "../components/ui/Caretakers";
import SearchBar from "../components/ui/SearchBar";
import SearchFilter from "../components/ui/SearchFilter";

export default function SearchResults() {
  const location = useLocation();

  const [caretakersCount, setCaretakersCount] = useState(0);
  const [filters, setFilters] = useState({
    service: "",
    zone: "",
    pets: "",
    neighborhood: "",
    reviews: "",
    maxPrice: "",
    order: "",
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const service = queryParams.get("service");
    const zone = queryParams.get("zone");

    setFilters((prevFilters) => ({
      ...prevFilters,
      service: service || "",
      zone: zone || "",
    }));
  }, [location.search]);

  const updateCaretakersCount = (count) => {
    setCaretakersCount(count);
  };

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div className="search-results-container">
      <SearchBar updateFilters={updateFilters} />
      <h2>Resultados:</h2>
      <p>{caretakersCount} personas</p>
      <SearchFilter updateFilters={updateFilters} />
      <Caretakers filters={filters} updateCaretakersCount={updateCaretakersCount} cardClassName="caretaker-card-search" />
    </div>
  );
}
