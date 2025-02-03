import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const serviceMapping = {
  "Cuidado": "caretaker",
  "Paseo": "dogwalker"
};

export default function SearchBar({ updateFilters }) {
  const [service, setService] = useState("");
  const [zone, setZone] = useState("");
  const [focus, setFocus] = useState("service");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const serviceOptions = Object.keys(serviceMapping);
  const regionOptions = ["Buenos Aires", "Córdoba", "Santa Fe"];

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
        regionOptions
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
    const mappedService = serviceMapping[service] || service;
    const params = new URLSearchParams();

    if (mappedService) {
      params.append("service", mappedService);
    }
    if (zone) {
      params.append("zone", encodeURIComponent(zone));
    }

    console.log("URL generada:", `/results?${params.toString()}`);
    navigate(`/results?${params.toString()}`, { replace: true });
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
          placeholder="Región"
          onChange={handleInputChange}
          onClick={() => {
            setFocus("zone");
            setSuggestions(regionOptions);
          }}
          onFocus={() => setSuggestions(regionOptions)}
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
