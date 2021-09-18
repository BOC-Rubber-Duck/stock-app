/**
 * @jest-environment jsdom
 */


import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import Stockbar from '../client/src/components/Portfolio/Stockbar.jsx';

// beforeEach(() => {

// });

afterEach(() => {
  cleanup();
});

test('Stockbar renders stock symbol when provided as props', () => {
  const stockData = {
    stockName: 'Tesla, Inc.',
    ticker_symbol: 'TSLA',
    amount: 1,
    valueOwned: 350000
  };

  render(<Stockbar stock={stockData} useCase='portfolio'/>);
  expect(screen.getByText('TSLA')).toBeInTheDocument();
});

// test('Stockbar renders stock name when provided as props', () => {
//   const stockData = {
//     stockName: 'Tesla, Inc.',
//     stockSymbol: 'TSLA',
//     amount: 350000
//   };

//   render(<Stockbar stock={stockData} useCase='portfolio'/>);
//   expect(screen.getByText('Tesla, Inc.')).toBeInTheDocument();
// });

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
    amount: 1,
    valueOwned: 350000
  };

  render(<Stockbar stock={stockData} useCase='portfolio'/>);
  expect(screen.getByText('$350000')).toBeInTheDocument();
});