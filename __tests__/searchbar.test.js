/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

import Searchbar from '../client/src/components/Searchbar.jsx';
import Predictions from '../client/src/components/Predictions.jsx';



const server = setupServer(
  rest.get('/fetchSelectedStock', (req, res, ctx) => {
    console.log('fetchSelectedStock')
  }),
  rest.get('/userStockSearch', (req, res, ctx) => {
    console.log('userStockSearch')
  })
)


const samplePredictions = [
  {
    "name": "Apple Inc.",
    "symbol": "AAPL"
  }
];


beforeAll(() => server.listen());
beforeEach(() => {
  render(<Searchbar userPortfolio={[]} />);
  server.resetHandlers();
});
afterEach(() => {
  cleanup();
});
afterAll(() => server.close());

