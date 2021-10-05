import React from 'react';
import { json, checkStatus } from './utils';
import Chart from 'chart.js/auto';
import './chart.css';

class RateHistory extends React.Component {
  constructor(props) {
    super(props);
    
    const params = new URLSearchParams(props.location.search);

    this.state = {
      fromCurrency: params.get('base') || 'USD',
      toCurrency: params.get('quote') || 'GBP',
      error: '',
    };

    this.chartRef = React.createRef();
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

  componentDidMount () {
    const {fromCurrency, toCurrency} = this.state;
    this.getHistoricalRates(fromCurrency, toCurrency);
  }

  render() {
    const {fromCurrency, toCurrency} = this.state;
    return <div className='container text-center mt-5'>
      <h1 className='text'>Historical rate of {fromCurrency} Dollar to {toCurrency}</h1>
      <div className='row justify-content-center chart mt-4'>
        <div className='col-12 col-md-10 bg-light border border-success rounded m-5'>
          <canvas ref={this.chartRef} />
        </div>
      </div>
    </div>
  }

}

export default RateHistory;