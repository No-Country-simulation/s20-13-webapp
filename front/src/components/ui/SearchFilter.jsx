import React, { useState } from "react";

export default function SearchFilter({ updateFilters }) {

  const [filters, setFilters] = useState({
    petType: "",
    neighborhood: "",
    rating: "",
    maxPrice: "",
    order: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [name]: value,
      };
      updateFilters(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div className="search-filter-container">
      <p>Filtrar por:</p>
      <div className="search-filter">
        {/* Tipo de mascota */}
        <select name="petType" value={filters.petType} onChange={handleChange}>
          <option value="">Tipo de mascota</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Otro">Otro</option>
        </select>

        {/* Barrio */}
        <select name="neighborhood" value={filters.neighborhood} onChange={handleChange}>
          <option value="">Barrio</option>
          <option value="San Telmo">San Telmo</option>
          <option value="Palermo">Palermo</option>
          <option value="Recoleta">Recoleta</option>
        </select>

        {/* Valoración */}
        <select name="rating" value={filters.rating} onChange={handleChange}>
          <option value="">Valoración mínima</option>
          <option value="1">1 estrella</option>
          <option value="2">2 estrellas</option>
          <option value="3">3 estrellas</option>
          <option value="4">4 estrellas</option>
          <option value="5">5 estrellas</option>
        </select>

        {/* Ordenar por precio */}
        <select className="order-filter" name="order" value={filters.order} onChange={handleChange}>
          <option value="">Ordenar por</option>
          <option value="Menor precio">Menor precio</option>
          <option value="Mayor precio">Mayor precio</option>
        </select>
      </div>
    </div>
  );
}
