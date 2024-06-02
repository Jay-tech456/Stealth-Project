import { NavLink, Link, useLocation } from "react-router-dom";
import "../styles/navigation.css";
import React, { useState, useEffect, useContext } from 'react';
import blacklogo from "../artifacts/blacklogo.png";
import whitelogo from "../artifacts/whitelogo.png";
import AuthContext from "../functions/hook";

function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const location = useLocation();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/home") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [location]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navigation">
      <div className="bigscreen">
        <div className="left">
          <img src={isHome ? whitelogo : blacklogo} alt="logo" width={40} height={40} />
          <p style={{ color: isHome ? 'white' : 'black' }}> MY PLACES </p>
        </div>
        <div className="mid"></div>
        <div className="right" style={{ color: isHome ? 'white' : 'black' }}>
          <NavLink exact to="/" activeclassname="active" style={{ color: isHome ? 'white' : 'black' }}> Home </NavLink>
          <NavLink to="/restaurants" activeclassname="active" style={{ color: isHome ? 'white' : 'black' }}> Restaurants </NavLink>
          {login ? (
            <NavLink to="/profile" activeclassname="active" style={{ color: isHome ? 'white' : 'black' }}> Profile </NavLink>
          ) : (
            <NavLink to="/auth" activeclassname="active" style={{ color: isHome ? 'white' : 'black' }}> Login </NavLink>
          )}
        </div>
      </div>
      <div className="mobilescreen">
        <div className="smallscreen">
          <div className="left">
            <img src={isHome ? whitelogo : blacklogo} alt="logo" width={40} height={40} />
            <p style={{ color: isHome ? 'white' : 'black' }}> MY PLACES </p>
          </div>
          <div className="burger" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
      <div className={`menu ${showMenu ? 'open' : ''}`} onClick={toggleMenu}>
        <NavLink exact to="/" activeclassname="active"> Home </NavLink>
        <NavLink to="/restaurants" activeclassname="active"> Restaurants </NavLink>
        {login ? (
            <NavLink to="/profile" activeclassname="active" style={{ color: isHome ? 'white' : 'black' }}> Profile </NavLink>
          ) : (
            <NavLink to="/auth" activeclassname="active" style={{ color: isHome ? 'white' : 'black' }}> Login </NavLink>
          )}
      </div>
    </div>
  );
}

export default Navigation;
