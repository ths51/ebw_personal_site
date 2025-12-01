import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-essentials">
        <button className="navbar-menu-dropdown-icon" onClick={() => { setIsDropdownActive(!isDropdownActive) }}><img className="menu-icon" src="/assets/menu-icon.svg" /></button>
        <Link to="/" className="nav-link"><img src="/assets/icon.svg" className="icon" /></Link>
      </div>
      <div className={ "links" + (isDropdownActive ? " dropdown-active" : "") }>
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/contact" className="nav-link">Contact</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;