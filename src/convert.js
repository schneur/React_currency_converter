import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

let currencies = ["USD","AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","ZAR"];

class SimpleInput extends React.Component {
  render() {
    const { value, onChange } = this.props;
    return <input name="amount" value={value} onChange={onChange} type="number"/>
  }
}

class FromCurrency extends React.Component {
  render() {
    const { value, onChange, posts } = this.props;
    
    const currencySelections = posts.map(current => <option key={current}  value={current}> {current} </option>);
    return (
      <select id="fromCurrrency" name="fromCurrency" value={value} onChange={onChange} >{currencySelections}</select>
    )

  }
}
class ToCurrency extends React.Component {
  render() {
    const { value, onChange, posts } = this.props;
    
    const currencySelections = posts.map(current => <option key={current} value={current}> {current} </option>);
    return (
      <select id="toCurrrency" name="toCurrency" value={value} onChange={onChange} >{currencySelections}</select>
    )

  }
}

class Convert extends React.Component {
  render() {
    const {onClick} = this.props;
    return (
      <button type="submit" onClick={onClick} className="btn btn-primary">Submit</button>
    )
  }
}

class Conversion extends React.Component {
  render() {

 console.log(this.props.results.rates)
 const {rates} = this.props.results;
 console.log(rates);
 let rate = [];
 for (const property in rates) {rate.push(property, parseFloat(rates[property]).toFixed(2))

  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8 col-md-9 mb-3">
          <h4>{rate[0]} | {rate[1]}</h4>
        </div>
      </div>
    </div>
  )}
  }


class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      fromCurrency: 'USD',
      toCurrency: 'GBP',
      error: '',
      results: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let {amount,  fromCurrency, toCurrency } = this.state;
    fetch(`https://altexchangerateapi.herokuapp.com/latest?&amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }
      this.setState({ results: data, error: '' });
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { fromCurrency, toCurrency, amount, results, error } = this.state;
 
 
  
    return <div>
    <SimpleInput value={amount} onChange={this.handleChange} />
    <FromCurrency posts={currencies} value={fromCurrency} onChange={this.handleChange}/>
    <ToCurrency posts={currencies} value={toCurrency} onChange={this.handleChange}/>
    <Convert onClick={this.handleSubmit} />
    <div>
     <Conversion results={results} />
   </div>
    </div>
  }
}

export default SimpleForm;

