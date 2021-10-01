import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './navbar.css';

const Navbar = (props) => {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
    <Link to='/'><div className="navbar-brand">LegoPal</div></Link>
    <button className="navbar-toggler bg-warning border border-success" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link mt-1" to="/currencyConverter">Currency converter</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link mt-1" to="/about/">Exchange rates</Link>
        </li>
      </ul>
    </div>
  </nav>
  )
  };

  export default Navbar;