import React from 'react';

const SubmitButton = (props) => {
  const {onClick} = props;
  return (
    <button type="submit" onClick={onClick} className="btn btn-lg btn-success border border-danger mt-5">get started</button>
  )
};

export {SubmitButton};