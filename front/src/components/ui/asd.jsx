{user ? (
    <div>
      <img
        className='hamburger profile-picture'
        onClick={handleMenu}
        src={user.profilePicture}
        alt="profilePicture"
      />
    </div>
  ) : (
    <button className="hamburger" onClick={handleMenu}>&#9776;</button>
  )}

  <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
    {user ? (
      <>
        <Link to={"/profile"}>Ver Perfil</Link>
        <button className='menu-btn' onClick={handleLogout}>Cerrar Sesión</button>
      </>
    ) : (
      <>
        <Link to={"/auth"}>Iniciar Sesión</Link>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/auth"}>Services</Link>
        <Link to={"/auth"}>Contact</Link>
      </>
    )}
  </div>