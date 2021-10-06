import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import currencyConverter from './currencyConverter';
import Home from './welcomePage';
import ExchangeRates from './exchangeRatesForm';
import Footer from './footer'
import Navbar from './navbar';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/currencyConverter" component={currencyConverter} />
        <Route path="/exchangeRates/" component={ExchangeRates} />
        <Route component={NotFound} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;