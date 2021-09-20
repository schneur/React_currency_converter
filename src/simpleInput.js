import React from 'react';

const SimpleInput = (props) => {
  const { value, onChange, type } = props;
  return <input name="amount" value={value} onChange={onChange} type={type}/>
};

export {SimpleInput};