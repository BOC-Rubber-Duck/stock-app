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


const samplePredictions = [
  {
    "name": "Apple Inc.",
    "symbol": "AAPL",
    "type": 'stockSearch'
  }
];

const server = setupServer(
  rest.get('/fetchSelectedStock', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(samplePredictions)
    );
  }),
  rest.get('/userStockSearch', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(samplePredictions)
    );
  })
);

beforeAll(() => server.listen());
beforeEach(() => {
  server.resetHandlers();
});
afterEach(() => {
  cleanup();
});

afterAll(() => server.close());

describe('Renders Searchbar component', () => {
  it('Mock test', async () => {
    await act(async () => {
      await render(<Searchbar userPortfolio={samplePredictions} />);
    });
    let searchBox = screen.getByPlaceholderText('Search...');
    expect(searchBox).toBeTruthy();
    await act(async () => {
      await userEvent.type(searchBox, 'AAPL');
    });
    expect(searchBox.value).toBe('AAPL');
    // let results = await screen.findByText('AAPL');
    // expect(results).toBeTruthy();
  });
});