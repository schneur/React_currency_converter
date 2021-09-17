import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';
import { ExchangeRates } from './exchangeRates';


let currencies = ["USD","AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","ZAR"];

class SimpleInput extends React.Component {
  render() {
    const { value, onChange, type } = this.props;
    return <input name="amount" value={value} onChange={onChange} type={type}/>
  }
}

class CurrencyList extends React.Component {
  render() {
    const {name, value, onChange, posts } = this.props;
    
    const currencySelections = posts.map(current => <option key={current} value={current}> {current} </option>);
    return (
      <select name={name} value={value} onChange={onChange}> {currencySelections} </select>
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
class SwitchCurrencies extends React.Component {
  render() {
    const {onClick} = this.props;
    return (
      <button type="submit" onClick={onClick} className="btn btn-primary">switch</button>
    )
  }
}

class Conversion extends React.Component {
  render() {

 const {rates} = this.props.results;
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
      exchangeRates: '',
      baseCurrency: 'USD',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handle = this.handle.bind(this);
    this.checkCurrencies = this.checkCurrencies.bind(this);
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

  handle(event) {
    event.preventDefault();
    let {fromCurrency, toCurrency} = this.state;
    this.setState({"fromCurrency": [toCurrency], "toCurrency": [fromCurrency]})
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  checkCurrencies(event) {
    let {fromCurrency} = this.state;
    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${fromCurrency}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }
      this.setState({ exchangeRates: data, error: '' });
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  render() {
    const { fromCurrency, toCurrency, amount, results, error, exchangeRates } = this.state;

    return <div>
    <SimpleInput  type="number" value={amount} onChange={this.handleChange} />
    <CurrencyList name='fromCurrency' posts={currencies} value={fromCurrency} onChange={this.handleChange}/>
    <CurrencyList name="toCurrency" posts={currencies} value={toCurrency} onChange={this.handleChange}/>
    <Convert onClick={this.handleSubmit} />
    <SwitchCurrencies onClick={this.handle} />
    <Conversion results={results} />
    <SimpleInput name='baseCurrency' value={fromCurrency} onChange={this.handleChange} />
    <Convert onClick={this.checkCurrencies} />
    <ExchangeRates rates={exchangeRates}/>
   </div>
  }
}

export default SimpleForm;



