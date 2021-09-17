import axios from 'axios';

const getPortfolioData = (user) => {
  const stocks = user.userPortfolio;
  const stockData = stocks.slice();
  user.portfolioValue = 0;

  axios.all(stockData.map((stock) =>
    axios.get('/fetchSelectedStock', {
      params: {
        symbol: stock.ticker_symbol
      }
    })
  ))
    .then(axios.spread((...responses) => {
      for (var i = 0; i < responses.length; i++) {
        stocks[i].stockName = responses[i].name;
        stocks[i].valueOwned = stocks[i].amount * responses[i].price;
        user.portfolioValue += stocks[i].valueOwned;
      }
      // ******write the porfolio value to the database for said user*******
      return user;
    }))
    .catch((err) => {
      console.log(err);
    });
};

export default getPortfolioData;