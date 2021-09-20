import React from 'react';
import { json, checkStatus } from './utils';
import { CurrencyList } from './currenciesList';
import { SimpleInput } from './simpleInput';
import { SwapCurrencies } from './switchCurrencies';
import { Conversion } from './ConversionComponent';

let currencies = ["USD","AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","ZAR"];

class CurrencyConverter extends React.Component {
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
    this.convert = this.convert.bind(this);
    this.swap = this.swap.bind(this);
  }

  componentDidMount () {
    this.convert();
  }

  convert() {
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

  swap(event) {
    event.preventDefault();
    let {fromCurrency, toCurrency} = this.state;
    this.setState({"fromCurrency": [toCurrency], "toCurrency": [fromCurrency]}, this.convert)
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.convert);
  }

  render() {
    const { fromCurrency, toCurrency, amount, results, error} = this.state;

    return <div>
    <SimpleInput  type="number" value={amount} onChange={this.handleChange} />
    <CurrencyList name='fromCurrency' posts={currencies} value={fromCurrency} onChange={this.handleChange}/>
    <CurrencyList name="toCurrency" posts={currencies} value={toCurrency} onChange={this.handleChange}/>
    <SwapCurrencies onClick={this.swap} />
    <Conversion results={results} />

   </div>
  }
}

export default CurrencyConverter;



