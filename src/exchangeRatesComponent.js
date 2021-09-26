import React from 'react';
import './exchangeRatesComponent.css';

const ExchangeRates = (props) => {
  const exchangeRates = props.rates;
  const {rates} = exchangeRates;

  if (!exchangeRates) {
    return null;
  }

  const content = Object.keys(rates).map((current,index) =>
   
  <div className="col-12 col-sm-6" key={current}>
    <p>{current} : {rates[current].toFixed(2)}</p>
    <hr/>
  </div>
);

  return (
    <div className='row justify-content-center bg-light border rounded border-success pt-5 mt-5'>
      {content}
    </div>
  );
}

export {ExchangeRates}; 
