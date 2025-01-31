
import { Link } from 'react-router';

import Logo from './Logo';
import { useState } from 'react';

const Header = ({ user, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="navbar">
        <Logo />

        {
          user && <>
            <img
                className='profile-picture'
                onClick={handleMenu}
                src={user.profilePicture}
                alt="profilePicture"
              />
            <div className={`usermenu ${isMenuOpen ? 'active' : ''}`}>
             
              <Link to={"/profile"}>Ver Perfil</Link>
              <button className='menu-btn' onClick={handleLogout}>Cerrar Sesión</button>

            </div>

          </>

        }

        {
          !user &&
          <>
            <button className="hamburger" onClick={handleMenu}>&#9776;</button>
            <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
              <>
                <Link to={"/auth"}>Iniciar Sesión</Link>
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/auth"}>Services</Link>
                <Link to={"/auth"}>Contact</Link>
              </>

            </div>
          </>

        }






      </div>
    </header>
  );
};

export default Header;
