import React from 'react';

const ExchangeRates = (props) => {
  const exchangeRates = props.rates;
  const {rates} = exchangeRates;

  if (!exchangeRates) {
    return null;
  }

  const content = Object.keys(rates).map((current,index) =>
   
  <div className="col-12 col-sm-6" key={current}>
    <p>{current} : {rates[current].toFixed(2)}</p>
  </div>
  
);

  return (
    <div className='row justify-content-center pt-5 mt-5'>
      {content}
    </div>
  );
}

export {ExchangeRates}; 
