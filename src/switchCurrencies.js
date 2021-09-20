import React from "react";

const SwapCurrencies = (props) => {
  const {onClick} = props;
  return (
    <button type="submit" onClick={onClick} className="btn btn-primary">switch</button>
  )
};

export { SwapCurrencies };