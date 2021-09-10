/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import {shalllow} from 'enzyme';


import Searchbar from '../client/src/components/Searchbar.jsx';
import Predictions from '../client/src/components/Predictions.jsx';

const samplePredictions = [
  {
      "name": "American Airlines Group, Inc.",
      "symbol": "AAL"
  },
  {
      "name": "Atlantic American Corporation",
      "symbol": "AAME"
  },
  {
      "name": "Applied Optoelectronics, Inc.",
      "symbol": "AAOI"
  },
  {
      "name": "AAON, Inc.",
      "symbol": "AAON"
  },
  {
      "name": "Apple Inc.",
      "symbol": "AAPL"
  }
]

beforeEach(() => {
  render(<Searchbar />);
  render(<Predictions predictions={samplePredictions}/>)
});

afterEach(() => {
  cleanup();
});

test('Searchbar renders correctly', () => {
  const placeholder = screen.getByPlaceholderText('Search...');
  expect(placeholder).toBeTruthy();
});

test('Prediction render correctly', () => {
  const predicitons =
})