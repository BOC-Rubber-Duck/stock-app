import axios from 'axios';

const getPortfolioData = (user) => {
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
          // console.log(responses[i]);
          stocks[i].stockName = responses[i].data.name;
          stocks[i].valueOwned = stocks[i].amount * responses[i].data.price;
          user.portfolioValue += stocks[i].valueOwned;
        }
        resolve(user);
      }))
      .catch((err) => {
        reject(err);
      });
  });
};

export default getPortfolioData;