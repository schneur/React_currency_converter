import React from 'react';
import { json, checkStatus } from './utils';
import { ExchangeRates } from './exchangeRatesComponent';
import { CurrencyList } from './currenciesList';
import { SimpleInput } from './simpleInput';
import './exchangeRatesForm.css';
import lego4 from './images/lego4.jpg';

class CurrenciesExchangeList extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);

    this.state = {
      amount: 1,
      error: '',
      results: [],
      exchangeRates: '',
      baseCurrency: params.get('base') ||'USD',
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

    return  <div className="container">
      <img className='lego4' src={lego4} alt='lego people'/>
      <form>
        <div className="row justify-content-center mt-4 pt-5">
          <div className="col-4">
            <label>Amount</label>
            <SimpleInput name='amount' value={amount} type='number' onChange={this.handleChange} />
          </div>
          <div className="col-4">
            <label>Base currency</label>
            <CurrencyList name='baseCurrency' value={baseCurrency} onChange={this.handleChange} />
          </div>
        </div>
      </form>
      <div className="row justify-content-center exchangeRates mt-5 pt-3">
        <div className='col-4'>
          <h3 className="text-center">Rates</h3>
          <ExchangeRates rates={exchangeRates}/>
        </div>
      </div>
     </div>
  }
}

export default CurrenciesExchangeList;



