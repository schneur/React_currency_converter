import React from 'react';
import { json, checkStatus } from './utils';
import { ExchangeRates } from './exchangeRatesComponent';
import { CurrencyList } from './currenciesList';
import { SimpleInput } from './simpleInput';

let currencies = ["USD","AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","ZAR"];

class CurrenciesExchangeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      error: '',
      results: [],
      exchangeRates: '',
      baseCurrency: 'USD',
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkCurrencies = this.checkCurrencies.bind(this);
  }

  componentDidMount () {
    this.checkCurrencies();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.checkCurrencies);
  }

  checkCurrencies(event) {
    let {baseCurrency,amount} = this.state;
    fetch(`https://altexchangerateapi.herokuapp.com/latest?&amount=${amount}&from=${baseCurrency}`)
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
    const { baseCurrency, amount, exchangeRates } = this.state;

    return  <div className="container m-5">
      <form>
        <div className="row justify-content-center mt-4 pt-5">
          <div className="col-4">
            Amount
            <SimpleInput name='amount' value={amount} type='number' onChange={this.handleChange} />
          </div>
          <div className="col-4">
            Base currency
            <CurrencyList name='baseCurrency' list={currencies} value={baseCurrency} onChange={this.handleChange} />
          </div>
        </div>
      </form>
      <div className="row justify-content-center exchangeRates">
        <div className='col-4'>
<ExchangeRates rates={exchangeRates}/>
        </div>
        
      </div>
     
    </div>
  }
}

export default CurrenciesExchangeList;



