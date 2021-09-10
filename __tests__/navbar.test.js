/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';

import Navbar from '../client/src/components/Navbar.jsx';

beforeEach(() => {
  render(<Navbar />);
});

afterEach(() => {
  cleanup();
});


test('Navbar renders correctly', () => {
  const leaderboard = screen.getByText(/Leaderboard/i);
  const portfolio = screen.getByText(/Portfolio/i);
  const stocks = screen.getByText(/Find Stocks/i);
  expect(leaderboard).toBeTruthy();
  expect(portfolio).toBeTruthy();
  expect(stocks).toBeTruthy();
});