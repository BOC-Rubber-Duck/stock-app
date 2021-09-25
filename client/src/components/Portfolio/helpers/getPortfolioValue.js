import axios from 'axios';

const getPortfolioValue = (user) => {
  const stocks = user.userPortfolio;
  const stockData = stocks.slice();
  user.portfolioValue = 0;

  return new Promise((resolve, reject) => {
    axios.all(stockData.map((stock) =>
      axios.get('/fetchSelectedStock', {
        params: {
          'symbol': stock.ticker_symbol
        }
      })
    ))
      .then(axios.spread((...responses) => {
        for (var i = 0; i < responses.length; i++) {
          stocks[i].stockName = responses[i].data.name;
          stocks[i].valueOwned = stocks[i].amount * responses[i].data.price;
          user.portfolioValue += stocks[i].valueOwned;
        }
        axios.put('/api/portfolioValue', {'user_id': user.userPortfolio[0].user_id, 'portfolio_value': user.portfolioValue * 100}).then((queryResults) => {
          resolve(user);
        }).catch((err) => {
          console.log('error writing portfolioValue to db:', err);
          resolve(user);
        });
      }))
      .catch((err) => {
        reject(err);
      });
  });
};

export default getPortfolioValue;