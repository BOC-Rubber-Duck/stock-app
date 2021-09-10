/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import {shallow, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({adapter: new Adapter()});


import Searchbar from '../client/src/components/Searchbar.jsx';
import Predictions from '../client/src/components/Predictions.jsx';

const samplePredictions = [
  {
    "name": "Apple Inc.",
    "symbol": "AAPL"
  }
];

beforeEach(() => {
  render(<Searchbar />);
  render(<Predictions predictions={samplePredictions}/>);
});

afterEach(() => {
  cleanup();
});

test('Searchbar renders correctly', () => {
  const placeholder = screen.getByPlaceholderText('Search...');
  expect(placeholder).toBeTruthy();
});

test('Predictions render correctly', () => {
  const AAPL = screen.getByText(/AAPL/);
  expect(AAPL).toBeTruthy();
});