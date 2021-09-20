import React from 'react';

const SubmitButton = (props) => {
  const {onClick} = props;
  return (
    <button type="submit" onClick={onClick} className="btn btn-primary">Submit</button>
  )
};

export {SubmitButton};