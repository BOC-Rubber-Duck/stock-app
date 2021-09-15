/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import Usercard from '../client/src/components/Usercard.jsx';

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
  render(<Usercard user={user}/>);
});

afterEach(() => {
  cleanup();
});

test('Usercard renders username and rank', () => {
  expect(screen.getByText('RubberDuck')).toBeInTheDocument();
  expect(screen.getByText('Rank: 2')).toBeInTheDocument();
});

test('Usercard renders cash balance and stock value', () => {
  expect(screen.getByText('$200000')).toBeInTheDocument();
  expect(screen.getByText('$1050000')).toBeInTheDocument();
});

test('Usercard renders total portfolio value', () => {
  expect(screen.getByText('$1250000')).toBeInTheDocument();
});