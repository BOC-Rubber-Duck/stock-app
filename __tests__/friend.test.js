/**
* @jest-environment jsdom
*/

import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Friend from '../client/src/components/Friend.jsx';

// test api results
const apiMockResults = [
  { 'id': '1', 'username': 'graphite-x' },
  { 'id': '2', 'username': 'gryffindor' },
  { 'id': '3', 'username': 'tygah' }
];

const server = setupServer(
  rest.get('/api/getUsers', (req, res, ctx) => {
    const searchParam = req.url.searchParams.get('username');
    let responseData = apiMockResults;

    if (searchParam === 'gr') {
      responseData = apiMockResults.slice(0, 2);
    };

    if (searchParam === 'gra') {
      responseData = apiMockResults.slice(0, 1);
    }

    return res(
      ctx.status(200),
      ctx.json(responseData)
    );
  }),
);

beforeAll(() => server.listen());
beforeEach(() => {
  render(<Friend />);
  server.resetHandlers();
});
afterAll(() => server.close());

describe('Friend displays properly on initial render', () => {
  it('Search box exists with placeholder text', () => {
    const searchbox = screen.getByRole('searchbox');
    expect(searchbox.placeholder).toBeTruthy();
  }),
  it('Search results area is empty', () => {
    const results = screen.getByRole('list');
    expect(results).toBeTruthy();
    expect(results.firstChild).toBeNull();
  });
});

describe('Friend search displays the correct results', () => {
  it('Correct results with a one-character search', async () => {
    userEvent.type(screen.getByRole('searchbox'), 'g');
    const results = await screen.findAllByRole('listitem');
    expect(results).toBeTruthy();
    expect(results.length).toEqual(3);
  });
});

// TODO: cannot get a two-character search to work; keeping here to revisit
// it('Correct results with a two-character search', async () => {
//   fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'g' } });
//   userEvent.type(screen.getByRole('searchbox'), 'r');
//   let results = await screen.findAllByRole('listitem');
//   expect(results).toBeTruthy();
//   expect(results.length).toEqual(2);
// });

// TODO: 'The page will not search on one or more spaces'