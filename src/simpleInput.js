import React from 'react';
import './simpleInput.css';

const SimpleInput = (props) => {
  const { value, onChange, type } = props;
  return <input className="form-control custom-select bg-light" name="amount" value={value} onChange={onChange} type={type}/>
};

export {SimpleInput};