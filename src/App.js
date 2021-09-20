import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './currencyConverter';
import ExchangeRates from './exchangeRatesForm'
import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Currency converter</Link>
      <Link to="/about/">Exchange rates</Link>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={ExchangeRates} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;