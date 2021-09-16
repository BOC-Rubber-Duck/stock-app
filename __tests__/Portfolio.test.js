/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import Portfolio from '../client/src/components/Portfolio.jsx';
import {BrowserRouter} from 'react-router-dom';

beforeEach(() => {
  const user = {
    first_name: '',
    last_name: '',
    username: 'RubberDuck',
    email: '',
    cashBalance: 200000,
    rank: 2,
    userPortfolio: [
      {
        stockName: 'Amazon.com, Inc.',
        stockSymbol: 'AMZN',
        amount: 350000
      },
      {
        stockName: 'Telsa, Inc.',
        stockSymbol: 'TSLA',
        amount: 300000
      },
      {
        stockName: 'Apple',
        stockSymbol: 'AAPL',
        amount: 200000
      },
      {
        stockName: 'StockDucks, Inc.',
        stockSymbol: 'STKD',
        amount: 200000
      }
    ],
    friends: [
      // username, username
    ]
  };
  render(<BrowserRouter><Portfolio user={user}/></BrowserRouter>);
});

afterEach(() => {
  cleanup();
});

test('Portfolio renders a single usercard', () => {
  var usercards = document.getElementsByClassName('usercard');
  expect(usercards.length).toEqual(1);
});

test('Portfolio renders a stockbar for each stock in the portfolio', () => {
  var stockbars = document.getElementsByClassName('bar');
  expect(stockbars.length).toEqual(4);
});