import React from 'react';
import { json, checkStatus } from './utils';
import { CurrencyList } from './currenciesList';
import { SimpleInput } from './simpleInput';
import { SwapCurrencies } from './switchCurrencies';
import { Conversion } from './ConversionComponent';
import './currencyConverter.css';
import Chart from 'chart.js/auto';
import lego1 from './images/lego1.jpg';
import lego2 from './images/lego2.jpg';

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
    this.chartRef = React.createRef();
  }

  componentDidMount () {
    const {fromCurrency, toCurrency} = this.state;
    this.convert();
    this.getHistoricalRates(fromCurrency, toCurrency);
  }

  convert() {
    const {amount,  fromCurrency, toCurrency } = this.state;
    fetch(`https://altexchangerateapi.herokuapp.com/latest?&amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }
      this.setState({ results: data, error: '' });
    })
    .then(this.getHistoricalRates(fromCurrency, toCurrency))
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  swap(event) {
    event.preventDefault();
    let {fromCurrency, toCurrency} = this.state;
    this.setState({"fromCurrency": [toCurrency], "toCurrency": [fromCurrency]}, this.convert);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.convert);
  }

  getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    fetch(`https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${base}&to=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  };

  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d");
    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    })
  };

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
                <CurrencyList name='fromCurrency' value={fromCurrency} onChange={this.handleChange}/>
              </div>
              <div className="col-12 col-sm-2 text-center mt-4">
                <SwapCurrencies onClick={this.swap} />
              </div>
              <div className="col-xs-12 col-md-3">
              <label>To</label>
                <CurrencyList name='toCurrency' value={toCurrency} onChange={this.handleChange}/>
              </div>
          </div>
        </form>
        <Conversion results={results} />
      </div>
      <div className='container-fluid text-center mt-1 p-4'>
        <div className='row justify-content-center chart'>
          <div className='col-12 col-md-10 bg-light border border-success rounded'>
            <h1 className='text pt-2'>Historical rate of {fromCurrency} Dollar to {toCurrency}</h1>
            <canvas ref={this.chartRef} />
          </div>
        </div>
      </div>
    </React.Fragment>
  }
}

export default CurrencyConverter;



