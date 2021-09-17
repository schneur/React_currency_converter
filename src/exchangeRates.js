import React from 'react';

const ExchangeRates = (props) => {
  const exchangeRates = props.rates;
  const {rates} = exchangeRates;

  if (!exchangeRates) {
    return null;
  }

  const content = Object.keys(rates).map((post,index) =>
  <div key={post}>
    <p>{post} - {rates[post]}</p>
  </div>
);

  return (
    <div>
      {content}
    </div>
  );
}

export {ExchangeRates}; 
