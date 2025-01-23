import React from 'react'

export default function SearchBar() {
  return (
   <>
   <h1 className="titulo">Encontrá el cuidador ideal para tu mascota</h1>
        <div className="barrita">
          <div className="search-bar">
            <input type="text" placeholder="Buscar..." />
            <button type="button">Buscar</button>
          </div>
        </div>
   </> 
  )
}
