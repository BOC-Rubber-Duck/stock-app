/**
 * @jest-environment jsdom
 */
import getPortfolioValue from '../client/src/components/Portfolio/helpers/getPortfolioValue.js';
import axios from 'axios';

jest.mock('axios');

global.API_URL = 'http://localhost:3000';

describe('getPortfolioValue', () => {
  const user = {
    username: 'RubberDuck',
    cashBalance: 200000,
    rank: 2,
    userPortfolio: [
      {
        amount: 500,
        id: 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A21',
        ticker_symbol: 'amzn',
        user_id: 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11'
      },
      {
        amount: 300,
        id: 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A31',
        ticker_symbol: 'aapl',
        user_id: 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11'
      }
    ]
  };
  const results = [
    {
      name: 'Amazon.com Inc.',
      price: 30,
    },
    {
      name: 'Apple',
      price: 60,
    }
  ];
  const mockAxiosSpreadResult = jest.fn();

  beforeAll(() => {
    axios.get.mockClear();
    axios.all.mockResolvedValue(results);
    axios.spread.mockReturnValue(mockAxiosSpreadResult);
    getPortfolioValue(user);
  });

  it('updates valueOwned of a stock', () => {
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/fetchSelectedStock?symbol=aapl`);
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/fetchSelectedStock?symbol=amzn`);
  });
});


// // get/fetchSelectedStock
// axios.get.mockResolvedValue({ data: {
//   name: 'Amazon.com Inc.',
//   price: 30,
// } });

// // put/api/portfolioValue
// axios.put.mockResolvedValue({ data: {} });

// test('getPortfolioValue updates valueOwned of a stock', (done) => {
//   var user = {
//     first_name: '',
//     last_name: '',
//     username: 'RubberDuck',
//     email: '',
//     cashBalance: 200000,
//     rank: 2,
//     userPortfolio: [
//       {
//         amount: 500,
//         exchange: "nasdaq",
//         id: "A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A21",
//         ticker_symbol: "amzn",
//         user_id: "A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11"
//       }
//     ],
//     friends: [
//       // username, username
//     ]
//   };
//   return getPortfolioValue(user).then((expandedUser) => {
//     expect(expandedUser.userPortfolio[0].valuedOwned).toEqual(15000);
//   });
// });