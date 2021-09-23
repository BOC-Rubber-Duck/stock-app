/**
 * @jest-environment jsdom
 */
import getPortfolioValue from '../client/src/components/Portfolio/helpers/getPortfolioValue.js';
import axios from 'axios';

jest.mock('axios');

global.API_URL = 'http://localhost:3000';


describe('Getting Stock Data', () => {
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
    axios.put.mockResolvedValue('success!');
    axios.spread.mockReturnValue(mockAxiosSpreadResult);
    getPortfolioValue(user);
  });

  it('calls to the stock API for each stock in the portfolio', () => {
    expect(axios.get).toHaveBeenCalledWith('/fetchSelectedStock', {'params': {'symbol': 'amzn'}});

    expect(axios.get).toHaveBeenCalledWith('/fetchSelectedStock', {'params': {'symbol': 'aapl'}});
  });

  it('should call Axios.spread with a callback', () => {
    expect(axios.spread).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should call the result of axios.spread with the resolved value of axios.all', () => {
    expect(mockAxiosSpreadResult).toHaveBeenCalledWith(results);
  });

  describe('Axios.spread callback', () => {
    let callback;
    beforeAll(() => {
      callback = axios.spread.mock.calls[0][0];
    });

    describe('called with parameters', () => {
      let result;
      beforeAll(() => {
        result = callback({
          data: {
            name: 'Amazon.com Inc.',
            price: 30,
          }
        });
      });

      it('should not return the result of the put request ', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});