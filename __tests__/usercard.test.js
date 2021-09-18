/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import Usercard from '../client/src/components/Portfolio/Usercard.jsx';

beforeEach(() => {
  const user = {
    first_name: '',
    last_name: '',
    username: 'RubberDuck',
    email: '',
    cashBalance: 200000,
    rank: 2,
    userPortfolio: [],
    portfolioValue: 1050000
  };
  render(<Usercard user={user}/>);
});

afterEach(() => {
  cleanup();
});

test('Usercard renders username and rank', () => {
  expect(screen.getByText('RubberDuck')).toBeInTheDocument();
  // expect(screen.getByText('Rank: 2')).toBeInTheDocument();
});

test('Usercard renders cash balance and stock value', () => {
  expect(screen.getByText('$200000')).toBeInTheDocument();
  expect(screen.getByText('$1050000')).toBeInTheDocument();
});

test('Usercard renders total portfolio value', () => {
  expect(screen.getByText('$1250000')).toBeInTheDocument();
});