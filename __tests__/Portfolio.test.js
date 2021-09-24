/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import Portfolio from '../client/src/components/Portfolio/Portfolio.jsx';
import {BrowserRouter} from 'react-router-dom';

beforeEach(async () => {
  const user = {
    first_name: '',
    last_name: '',
    username: 'RubberDuck',
    email: '',
    cashBalance: 200000,
    rank: 2,
    userPortfolio: [
      {
        amount: 100000000,
        exchange: "nasdaq",
        id: "A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A21",
        ticker_symbol: "aapl",
        user_id: "A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11"
      },
      {
        amount: 100000000,
        exchange: "nasdaq",
        id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23",
        ticker_symbol: "fb",
        user_id: "A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11"
      },
      {
        amount: 100000000,
        exchange: "nasdaq",
        id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23",
        ticker_symbol: "amzn",
        user_id: "A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11"
      }
    ],
    friends: [
      // username, username
    ]
  };
  await render(<BrowserRouter><Portfolio user={user}/></BrowserRouter>);
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
  expect(stockbars.length).toEqual(3);
});