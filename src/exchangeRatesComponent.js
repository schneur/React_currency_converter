import React from 'react';

const ExchangeRates = (props) => {
  const exchangeRates = props.rates;
  const {rates} = exchangeRates;

  if (!exchangeRates) {
    return null;
  }

  const content = Object.keys(rates).map((current,index) =>
  <div key={current}>
    <p>{current} - {rates[current].toFixed(2)}</p>
  </div>
);

  return (
    <div>
      {content}
    </div>
  );
}

export {ExchangeRates}; 
