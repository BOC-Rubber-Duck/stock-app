module.exports.tradeValidation = (shares, stockOwned,  price, cashBalance, action) => {
  console.log('in tradeValidation function', shares, price, cashBalance, action);
  if (action === 'buy') {
    if ((shares * price) <= cashBalance) {
      return true;
    }
  } else if (action === 'sell') {
    if (shares <= stockOwned) {
      return true;
    }
  }
  return false;
};