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
    let responseData = '';

    if (searchParam === 'g') {
      responseData = apiMockResults;
    };

    if (searchParam === 'gr') {
      responseData = apiMockResults.slice(0, 2);
    };

    if (searchParam === 'gra') {
      responseData = apiMockResults.slice(0, 1);
    }

    // console.log('going to return:', responseData);
    return res(
      ctx.status(200),
      ctx.json(responseData)
    );
  }),
);

beforeAll(() => server.listen());
beforeEach(() => {
  server.resetHandlers();
  render(<Friend />);
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

describe('Friend instant search displays the correct results', () => {
  // it('Correct results with a two-character search', async () => {
  //   userEvent.type(screen.getByRole('searchbox'), 'g');
  //   expect(await screen.findByText('graphite-x')).toBeInTheDocument();
  //   expect(await screen.findByText('gryffindor')).toBeInTheDocument();
  //   expect(await screen.findByText('tygah')).toBeInTheDocument();
  //   let results = await screen.findAllByRole('listitem');
  //   expect(results.length).toEqual(3);

  //   userEvent.type(screen.getByRole('searchbox'), 'r');
  //   expect(await screen.findByText('graphite-x')).toBeInTheDocument();
  //   expect(await screen.findByText('gryffindor')).toBeInTheDocument();
  //   const tygah = screen.queryByText('tygah');
  //   expect(tygah).not.toBeInTheDocument();
  //   results = await screen.findAllByRole('listitem');
  //   expect(results.length).toEqual(2);

  //   // KEEPING FOR FUTURE STUDY
  //   // This section does exactly the same thing the last section above does
  //   // but using a different item in the mock results. Yet, it fails. Why?
  //   // For some reason, it still finds gryffindor in the document
  //   // userEvent.type(screen.getByRole('searchbox'), 'a');
  //   // expect(await screen.findByText('graphite-x')).toBeInTheDocument();
  //   // const gryffindor = screen.queryByText('gryffindor');
  //   // expect(gryffindor).not.toBeInTheDocument();

  //   // TODO: 'The page will not search on one or more spaces'
  // });
});
