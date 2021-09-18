/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import axios from 'axios';

import Searchbar from '../client/src/components/Searchbar.jsx';
import Predictions from '../client/src/components/Predictions.jsx';

import {filterStockSearch} from '../server/controllers/searchStocks.js';

const samplePredictions = [
  {
    "name": "Apple Inc.",
    "symbol": "AAPL"
  }
];

jest.mock('axios');

beforeEach(() => {
  render(<Predictions predictions={samplePredictions}/>);
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Test stock search/filter', () => {
  it('Return empty array if no stocs match or no input', () => {
    const noMatch = filterStockSearch('xxxxx');
    const noInput = filterStockSearch('');
    expect(noMatch.length).toBe(0);
    expect(noInput.length).toBe(0);
  }),
  it('Returns expected input', () => {
    const appleSearch = filterStockSearch('apple');
    const APPLSearch = filterStockSearch('APPL');
    expect(appleSearch.length).toBe(1);
    expect(APPLSearch.length).toBe(7);
  });
});

test('Displays stocks on user input/handles state chagne', async () => {
  await act(async () => {
    //await axios.get.mockImplementation(() => Promise.resolve({symbol: 'AAPL'}));
    render(<Searchbar userPortfolio={[]} />);
    const searchField = screen.getByPlaceholderText('Search...');
    //await expect(searchField).toBeTruthy()

    // userEvent.type(searchField, 'AAPL');

    //await expect(searchField).toHaveValue('AAPL')


  })
})

test('Searchbar renders correctly with owned stocks', async () => {
  const fakeData = [
    {
      "name": "AAON, Inc.",
      "symbol": "AAON"
    },
    {
      "name": "Apple Inc.",
      "symbol": "AAPL"
    },
  ];

  await act(async () => {
    await axios.get.mockImplementationOnce(() => Promise.resolve(fakeData));
    render(<Searchbar userPortfolio={fakeData}/>);
  });

  await expect(axios.get).toHaveBeenCalledTimes(2);
});

test('Predictions render correctly', () => {
  const AAPL = screen.getByText(/AAPL/);
  expect(AAPL).toBeTruthy();
});

