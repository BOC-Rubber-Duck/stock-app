/**
 * @jest-environment jsdom
 */
import axios from 'axios';
import getPortfolioValue from '../client/src/components/Portfolio/helpers/getPortfolioValue.js';

jest.mock('axios');
// get/fetchSelectedStock
axios.get.mockResolvedValue({ data: {
  name: 'Amazon.com Inc.',
  price: 30,
} });

// put/api/portfolioValue
axios.put.mockResolvedValue({ data: {} });

test('getPortfolioValue updates valueOwned of a stock', (done) => {
  var user = {
    first_name: '',
    last_name: '',
    username: 'RubberDuck',
    email: '',
    cashBalance: 200000,
    rank: 2,
    userPortfolio: [
      {
        amount: 500,
        exchange: "nasdaq",
        id: "A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A21",
        ticker_symbol: "amzn",
        user_id: "A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11"
      }
    ],
    friends: [
      // username, username
    ]
  };
  return getPortfolioValue(user).then((expandedUser) => {
    expect(expandedUser.userPortfolio[0].valuedOwned).toEqual(15000);
  });
});