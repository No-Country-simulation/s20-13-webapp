import React from 'react'

export default function Header() {
  return (
    <header>
    <div class="navbar">
      
      <div class="logo" onclick="logoClick()"><img src="Logo.png" alt=""/></div>
  
     
      <div class="menu">
        <a href="#">Soy dueño</a>
        <a href="#">Soy cuidador</a>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </header>
    
  )
}
