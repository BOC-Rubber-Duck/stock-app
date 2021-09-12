const list = require('../stockList/stocks.json');

const filterStockSearch = (input) => {
  if (!input) {
    return [];
  }
  const filteredList = list.filter((stock) => {
    const name = stock['name'];
    const symbol = stock['symbol'];

    const regex = new RegExp('^' + input, 'ig');

    if (regex.test(name) || regex.test(symbol)) {
      return true;
    } else {
      return false;
    }
  });

  return filteredList.length > 7 ? filteredList.slice(0, 7) : filteredList;
};

module.exports = {
  filterStockSearch
};