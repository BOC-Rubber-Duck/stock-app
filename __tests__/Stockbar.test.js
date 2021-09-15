/**
 * @jest-environment jsdom
 */


import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import Stockbar from '../client/src/components/Stockbar.jsx';

// beforeEach(() => {

// });

afterEach(() => {
  cleanup();
});

test('Stockbar renders symbol and name when provided as props', () => {
  const stockData = {
    stockName: 'Tesla, Inc.',
    stockSymbol: 'TSLA',
    amount: 350000
  };

  render(<Stockbar stock={stockData} useCase='portfolio'/>);
  expect(screen.getByText('TSLA')).toBeInTheDocument();
  expect(screen.getByText('Tesla, Inc.')).toBeInTheDocument();
});

test('Stockbars do not render a value for type stockSearch', () => {
  const stockData = {
    stockName: 'Tesla, Inc.',
    stockSymbol: 'TSLA',
    amount: 350000
  };

  render(<Stockbar stock={stockData} useCase='stockSearch'/>);
  expect(screen.queryByText('$')).not.toBeInTheDocument();
});

test('Stockbar does render value for type portfolio', () => {
  const stockData = {
    stockName: 'Tesla, Inc.',
    stockSymbol: 'TSLA',
    amount: 350000
  };

  render(<Stockbar stock={stockData} useCase='portfolio'/>);
  expect(screen.getByText('$350000')).toBeInTheDocument();
});