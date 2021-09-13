/**
 * @jest-environment jsdom
 */


import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import Stockbar from '../client/src/components/Stockbar.jsx';

// beforeEach(() => {
//   render(<Portfolio />);
// });

afterEach(() => {
  cleanup();
});

test('Stockbar renders symbol and name when provided as props', () => {
  render(<Stockbar type='stockSearch' symbol='TSLA' name='Tesla, Inc.'/>);
  expect(screen.getByText('TSLA')).toBeInTheDocument();
  expect(screen.getByText('Tesla, Inc.')).toBeInTheDocument();
});

test('Stockbars do not render a value for type stockSearch', () => {
  render(<Stockbar type='stockSearch' symbol='TSLA' name='Tesla, Inc.'/>);
  expect(screen.queryByText('$')).not.toBeInTheDocument();
});

test('Stockbar does render value for type portfolio', () => {
  render(<Stockbar type='portfolio' symbol='STKD' name='Stock Ducks, Inc.' value='236.50'/>);
  expect(screen.getByText('$236.50')).toBeInTheDocument();
});