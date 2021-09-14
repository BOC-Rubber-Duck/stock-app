const axios = require('axios');
const ACCESS_KEY = process.env.MARKET_WATCH_TOKEN;

const URL = 'http://api.marketstack.com/v1/eod';

const fetchSelectedStock = (symbol, callback) => {
  axios.get(URL, {
    params: {
      symbols: symbol,
      access_key: ACCESS_KEY,
      limit: 500,
      sort: 'DESC'
    }
  })
    .then((res) => {
      const results = res.data;
      callback(null, results)
    })
    .catch((e) => {
      console.log('error in fetchSelectedStock controller')
      callback(e, null)
    })
}

module.exports = {
  fetchSelectedStock
}