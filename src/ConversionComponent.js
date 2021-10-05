import React from "react";
import { Link } from "react-router-dom";
import './conversionComponent.css';

const Conversion = (props) => {
  const {rates, amount, base} = props.results;

  if (!rates) {
    return null;
  }

  const rate = Object.keys(rates).map((post,index) =>
  <div key={post}>
    <Link to={`/chart?base=${base}&quote=${post}`}><p><span>{amount} Dollar(s) in {base} is </span> {rates[post].toFixed(2)} {post} </p></Link>
  </div>
  );
  
  return (
      <div className="row justify-content-center text-center mt-5">
        <div className="col-8 col-md-9 mb-5 pb-5 rate">
          <h4>{rate}</h4>
        </div>
      </div>
  )
  };

  export {Conversion};