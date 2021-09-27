import React from 'react';
import { json, checkStatus } from './utils';
import { CurrencyList } from './currenciesList';
import { SimpleInput } from './simpleInput';
import { SwapCurrencies } from './switchCurrencies';
import { Conversion } from './ConversionComponent';
import './currencyConverter.css';
import lego1 from './images/lego1.jpg';
import lego2 from './images/lego2.jpg';

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
    const { fromCurrency, toCurrency, amount, results} = this.state;

    return <React.Fragment>
      <div className='legoPeople text-center'>   
        <img className='lego1' src={lego1} alt='lego people'/>
        <img className='lego2' src={lego2} alt='lego people'/>
      </div>
      <div className="container-fluid">
      <form>
        <div className="row justify-content-center mt-5 pt-5">
        <div className="col-xs-12 col-md-3">
          <label>Amount</label>
            <SimpleInput type="number" value={amount} placeholder="1.00" onChange={this.handleChange} />
          </div>
          <div className="col-xs-12 col-md-3">
          <label>From</label>
            <CurrencyList name='fromCurrency' list={currencies} value={fromCurrency} onChange={this.handleChange}/>
          </div>
          <div className="col-12 col-sm-2 text-center mt-4">
            <SwapCurrencies onClick={this.swap} />
          </div>
          <div className="col-xs-12 col-md-3">
          <label>To</label>
            <CurrencyList name='toCurrency' list={currencies} value={toCurrency} onChange={this.handleChange}/>
          </div>
        </div>
      </form>
      <Conversion results={results} />
    </div>
    </React.Fragment>
  }
}

export default CurrencyConverter;



