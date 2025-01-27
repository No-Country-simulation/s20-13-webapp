import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { useUser } from '../../hooks/useUser';

export default function Header({user}) {
  const {logout}=useUser()
  const navigate = useNavigate()

  const [active, setActive] = useState(false)

  useEffect(() => {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
  }, [active])

  const handleMenu = () => {
    setActive(!active)
  }

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (

    <header>
      <div className="navbar">

        <Link to={"/"} className="logo" >
          <img src="./Logo.png" alt="Logo" />
        </Link>


        <button className="hamburger" onClick={handleMenu}>&#9776;</button>


        <div className="menu">
          {user ?
            (<>
              <h1 className='menu-h1'>Hola: {user.name}</h1>
              <button className='menu-btn' onClick={handleLogout}>Cerrar Sesión</button>
            </>
            )
            :
            (<>
              <Link to={"/auth"}>Iniciar Sesión</Link>
              <Link to={"/auth"}>Home</Link>
              <Link to={"/auth"}>About</Link>
              <Link to={"/auth"}>Services</Link>
              <Link to={"/auth"}>Contact</Link>
            </>)

          }

        </div>
      </div>

    </header>

  )
}
