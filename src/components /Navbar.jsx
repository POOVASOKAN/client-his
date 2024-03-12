import React from "react";
import Logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-white d-flex justify-content-center">
    <a className="navbar-brand" href="#">
      <img src={Logo} height="95" alt="Logo" />
    </a>
  </nav>
  
  
  );
};

export default Navbar;
