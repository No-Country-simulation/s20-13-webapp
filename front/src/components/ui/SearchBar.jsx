import { useState } from "react";


export default function SearchBar({ neighborhood, setNeighborhood}) {

  const [input,setInput]=useState("")

  const handleFilter = (e) => {
    e.preventDefault()
    setInput( e.target.value.toLowerCase() )
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setNeighborhood({
        ...neighborhood,
        neighborhood: input
      })
      
    }
  };

  return (
   <>
   <h1 className="titulo">Encontrá el cuidador ideal para tu mascota</h1>
        <div className="barrita">
          <div className="search-bar">
          <input
            onKeyDown={handleKeyDown}
            onChange={handleFilter}
            value={input}
            type="text"
            placeholder="Buscar por barrio..."
          />
          </div>
        </div>
   </> 
  )
}
