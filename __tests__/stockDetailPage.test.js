/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';

import StockDetailPage from '../client/src/components/StockDetailPage.jsx';
const {sampleData} = require('../sampleData/sampleData.js');

afterEach(() => {
  cleanup();
});

test('StockDetailPage renders stock symbol, name, and price', () => {
  const stockSelected = {
    name: 'Tesla',
    symbol: 'TSLA',
    price: 100,
    data: sampleData.data
  };
  const user = {
    cashBalance: 0,
    userPortfolio: []
  };
  render(<StockDetailPage stockSelected={stockSelected} user={user}/>);
  expect(screen.getByText('Tesla')).toBeInTheDocument();
  expect(screen.getByText('TSLA')).toBeInTheDocument();
  expect(screen.getByText('$100')).toBeInTheDocument();
});

test('StockDetailPage renders buy button when user has enough cash balance', () => {
  const stockSelected = {
    name: 'Tesla',
    symbol: 'TSLA',
    price: 100,
    data: sampleData.data
  };
  const user = {
    cashBalance: 100,
    userPortfolio: []
  };
  render(<StockDetailPage stockSelected={stockSelected} user={user}/>);
  expect(screen.getByText('Buy')).toBeInTheDocument();
});