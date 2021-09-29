/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';

import StockDetailPage from '../client/src/components/StockDetailPage.jsx';
import Graph from '../client/src/components/StockDetailPage/Graph.jsx';
import {formatAPIData} from '../client/src/components/StockDetailPage/helpers/formatAPIData.js';
import {getGraphOptions} from '../client/src/components/StockDetailPage/helpers/getGraphOptions.js';
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
  expect(screen.getByText('$100.00')).toBeInTheDocument();
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
test('StockDetailPage renders sell button when user owns at least 1 share of the stock', () => {
  const stockSelected = {
    name: 'Tesla',
    symbol: 'TSLA',
    price: 100,
    data: sampleData.data
  };
  const user = {
    cashBalance: 100,
    userPortfolio: [
      {
        stockName: 'Tesla',
        sharesOwned: 1
      }
    ]
  };
  render(<StockDetailPage stockSelected={stockSelected} user={user}/>);
  expect(screen.getByText('Sell')).toBeInTheDocument();
});

test('Graph renders when data is available', () => {
  const formattedData = formatAPIData(sampleData.data);
  render(<Graph data={formattedData}/>);
  expect(screen.getByRole('graph')).toBeInTheDocument();
});

test('getGraphOptions function returns an option with the correct shape', () => {
  const formattedData = formatAPIData(sampleData.data);
  const options = getGraphOptions(formattedData);
  expect(options.series[0].data.length).toBe(formattedData.ohlc.length);
});