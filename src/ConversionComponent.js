import React from "react";

const Conversion = (props) => {
  const {rates} = props.results;

  if (!rates) {
    return null;
  }

  const rate = Object.keys(rates).map((post,index) =>
  <div key={post}>
    <p>{post} - {rates[post].toFixed(2)}</p>
  </div>
  );
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-8 col-md-9 mb-3">
          <h4>{rate}</h4>
        </div>
      </div>
    </div>
  )
  };

  export {Conversion};