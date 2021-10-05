import React from 'react';
import './currenciesList.css';
import {currencies as list} from './currencies';

const CurrencyList = (props) => {
  const {name, value, onChange} = props;
  const currencySelections = list.map(current => <option key={current} value={current}> {current} </option>);
  return (
    <select className="form-control custom-select bg-light" name={name} value={value} onChange={onChange}> {currencySelections} </select>
  )
};

export {CurrencyList};