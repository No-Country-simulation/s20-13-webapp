import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Caretakers from "../components/ui/Caretakers"; // Ajusta la ruta según tu estructura de carpetas
import SearchBar from "../components/ui/SearchBar"; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import SearchFilter from "../components/ui/SearchFilter"; // Asegúrate de ajustar la ruta según tu estructura de carpetas

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const service = queryParams.get("service");
  const zone = queryParams.get("zone");

  const neighborhood = {
    neighborhood: zone || "",
  };

  const [caretakersCount, setCaretakersCount] = useState(0);

  // Callback para actualizar la cuenta de cuidadores desde el componente Caretakers
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
      <SearchBar /> {/* Incluye el buscador en la vista de resultados */}
      <h1>Resultados de la búsqueda</h1>
      <p>Cantidad de resultados: {caretakersCount}</p> {/* Mostrar la cantidad de resultados */}
      <SearchFilter updateFilters={updateFilters} /> {/* Pasar la función updateFilters como prop */}
      <Caretakers neighborhood={neighborhood} updateCaretakersCount={updateCaretakersCount} />
    </div>
  );
}
