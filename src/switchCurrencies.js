import React from "react";

const SwapCurrencies = (props) => {
  const {onClick} = props;
  return (
    <button type="submit" onClick={onClick} className="btn btn-success">switch</button>
  )
};

export { SwapCurrencies };