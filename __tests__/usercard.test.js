/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import Usercard from '../client/src/components/Usercard.jsx';

beforeEach(() => {
  const user = {
    username: 'RubberDuck',
    rank: 2,
    cashbalance: 400000,
    stockbalance: 500000
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
  expect(screen.getByText('$400000')).toBeInTheDocument();
  expect(screen.getByText('$500000')).toBeInTheDocument();
});

test('Usercard renders total portfolio value', () => {
  expect(screen.getByText('$400000')).toBeInTheDocument();
  expect(screen.getByText('$900000')).toBeInTheDocument();
});