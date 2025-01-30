import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Caretakers from "../components/ui/Caretakers"; 
import SearchBar from "../components/ui/SearchBar";
import SearchFilter from "../components/ui/SearchFilter";

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const service = queryParams.get("service");
  const zone = queryParams.get("zone");

  const neighborhood = {
    neighborhood: zone || "",
  };

  const [caretakersCount, setCaretakersCount] = useState(0);

  
  const updateCaretakersCount = (count) => {
    setCaretakersCount(count);
  };

  // Definir la función updateFilters
  const updateFilters = (filters) => {
    console.log("Updated filters:", filters);
    // lógica adicional para manejar los filtros actualizados
  };

  return (
    <div>
      <SearchBar className="search-results-container"/> 
      <h1>Resultados de la búsqueda</h1>
      <p>Cantidad de resultados: {caretakersCount}</p>
      <SearchFilter updateFilters={updateFilters} /> {/* Pasar la función updateFilters como prop */}
      <Caretakers neighborhood={neighborhood} updateCaretakersCount={updateCaretakersCount} />
    </div>
  );
}
