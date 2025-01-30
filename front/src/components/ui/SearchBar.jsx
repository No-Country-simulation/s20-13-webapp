import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [service, setService] = useState(""); 
  const [zone, setZone] = useState(""); 
  const [focus, setFocus] = useState("service"); 
  const [suggestions, setSuggestions] = useState([]); // sugerencias 
  const navigate = useNavigate();

  const serviceOptions = ["Cuidado", "Guardería", "Adiestramiento", "Veterinario"];
  const zoneOptions = ["Córdoba", "Buenos Aires", "Mendoza", "Rosario"];

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (focus === "service") {
      setService(value);
      setSuggestions(
        serviceOptions
          .filter((option) => option.toLowerCase().includes(value.toLowerCase()))
          .sort((a, b) => (a.toLowerCase().startsWith(value.toLowerCase()) ? -1 : 1))
      );
    } else {
      setZone(value);
      setSuggestions(
        zoneOptions
          .filter((option) => option.toLowerCase().includes(value.toLowerCase()))
          .sort((a, b) => (a.toLowerCase().startsWith(value.toLowerCase()) ? -1 : 1))
      );
    }
  };

  const handleSuggestionClick = (option) => {
    if (focus === "service") {
      setService(option);
    } else {
      setZone(option);
    }
    setSuggestions([]);
  };

  const handleSearch = () => {
    navigate(`/results?service=${service}&zone=${zone}`);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          value={service}
          placeholder="Servicio"
          onChange={handleInputChange}
          onClick={() => {
            setFocus("service");
            setSuggestions(serviceOptions);
          }}
          onFocus={() => setSuggestions(serviceOptions)}
          autoComplete="off"
        />
        <input
          type="text"
          value={zone}
          placeholder="Localidad"
          onChange={handleInputChange}
          onClick={() => {
            setFocus("zone");
            setSuggestions(zoneOptions);
          }}
          onFocus={() => setSuggestions(zoneOptions)}
          autoComplete="off"
        />
        <button type="button" onClick={handleSearch}>
          Buscar
        </button>
        {suggestions.length > 0 && (
          <ul className={`suggestions ${suggestions.length > 0 ? "show" : ""}`}>
            {suggestions.map((option, index) => (
              <li key={index} onClick={() => handleSuggestionClick(option)} className="suggestion-item">
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
