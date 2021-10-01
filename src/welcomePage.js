import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './welcomePage.css';
import lego6 from './images/lego6.jpg';
import lego7 from './images/lego7.jpg';
import { SubmitButton } from './submitButton';

const Welcome = (props) => {
  
  return (
    <React.Fragment>
      <img className="lego6 d-none d-sm-block" src={lego6} alt='lego background'/>
      <img className="lego7" src={lego7} alt='lego background'/>
      <div className='text-center mt-5 pt-4'>
        <h1>Welcome to <span>Legopal.</span></h1>
        <h2>Simple, easy to use, and kid friendly</h2>
        <h3>currency exchange App</h3>
        <Link to="/currencyConverter"><SubmitButton/></Link>
      </div>

    </React.Fragment>
  )
  };

  export default Welcome;
