import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import currencyConverter from './currencyConverter';
import Home from './welcome';
import ExchangeRates from './exchangeRatesForm';
import './App.css';
import './currenciesList.css';
import Footer from './footer'

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to='/'><div className="navbar-brand">LegoPal</div></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"aria-expanded="false" aria-label="Toggle navigation">
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

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/currencyConverter" exact component={currencyConverter} />
        <Route path="/about/" component={ExchangeRates} />
        <Route component={NotFound} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;