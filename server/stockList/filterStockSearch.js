const filterStockSearch = (input, list) => {
  return list.filter((stock) => {
    const name = stock['name'];
    const symbol = stock['symbol'];

    const regex = new RegExp('^' + input, 'ig');

    if (regex.test(name) || regex.test(symbol)) {
      return true;
    } else {
      return false;
    }
  });
};

module.exports = {
  filterStockSearch
};