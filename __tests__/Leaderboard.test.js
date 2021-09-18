/**
 * @jest-environment jsdom
 */

import React from 'react';

//Enzyme
import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount} from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// import react-testing methods
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react';

import {BrowserRouter} from 'react-router-dom';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

// the component to test
import Leaderboard from '../client/src/components/Leaderboard.jsx';

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  render(<BrowserRouter><Leaderboard /></BrowserRouter>);
});

afterEach(() => {
  cleanup();
});


test('Leaderboard renders', async () => {
  await waitFor(() => screen.getByRole('heading'));
  expect(screen.getByRole('heading')).toHaveTextContent('hello there');
});