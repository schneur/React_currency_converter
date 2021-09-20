import React from 'react';

const CurrencyList = (props) => {
  const {name, value, onChange, posts } = props;
  const currencySelections = posts.map(current => <option key={current} value={current}> {current} </option>);
  return (
    <select name={name} value={value} onChange={onChange}> {currencySelections} </select>
  )
};

export {CurrencyList};