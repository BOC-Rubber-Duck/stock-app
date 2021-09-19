/**
 * @jest-environment jsdom
 */

import React from 'react';

//Enzyme
import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount} from 'enzyme';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// import react-testing methods
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react';

import {BrowserRouter, MemoryRouter, Route} from 'react-router-dom';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

// the component to test
import Leaderboard from '../client/src/components/Leaderboard.jsx';

var count = 0;

var sampleList = [].concat([{"id":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11","password":"my_secret_password","first_name":"john","last_name":"smith","username":"jsmith","email":"john_smith@example.com","cash_position":"1000000","watching_user":null,"watched_user":null},{"id":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12","password":"my_secret_password","first_name":"jeffrey","last_name":"bezos","username":"bezos_the_first","email":"jeffrey_bezos@example.com","cash_position":"1000000","watching_user":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13","watched_user":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12"}]);

var sampleState = {
  list: sampleList,
  page: 1,
  user: {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    first_name: 'mark',
    last_name: 'zuckerberg',
    username: 'the_zuck',
    email: 'mark_zuckerberg@example.com',
    cash_position: 1000000,
    rank: null,
    portfolioValue: 0
  },
  hasMore: true,
  friendsMode: 'Leaderboard',
  entries: 2,
  previousList: sampleList
};

const server = setupServer(
  rest.get('/api/getLeaderboard', (req, res, ctx) => {
    count++;
    if (count < 1) {
      return res(ctx.json([{"id":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11","password":"my_secret_password","first_name":"john","last_name":"smith","username":"jsmith","email":"john_smith@example.com","cash_position":"1000000","watching_user":null,"watched_user":null},{"id":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12","password":"my_secret_password","first_name":"jeffrey","last_name":"bezos","username":"bezos_the_first","email":"jeffrey_bezos@example.com","cash_position":"1000000","watching_user":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13","watched_user":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12"}]));
    } else {
      return res(ctx.json([]));
    }
  }),
  rest.post('/api/postFriend', (req, res, ctx) => {
    return res(ctx.status(204));
  }),
  rest.delete('/api/deleteFriend', (req, res, ctx) => {
    return res(ctx.status(204));
  }),
);

beforeAll(() => {
  server.listen();
  server.events.on('request:start', (req) => {
    console.log('new request:', req.url.href);
  });
});
beforeEach(() => {

});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());


test('Leaderboard renders.', () => {
  var wrapper = mount(<BrowserRouter><Leaderboard /></BrowserRouter>);
  expect(wrapper.find('#list-header').text()).toMatch(/Leaderboard/);
});

test('Two Leaderboard entries render upon a mocked API call.', () => {
/*   var wrapper = mount(
    <MemoryRouter>
      <Route render={props => <Leaderboard {...props} />} />
    </MemoryRouter>); */
  var wrapper = mount(<Leaderboard />);
  wrapper.setState(sampleState, () => {
    wrapper.update();
    console.log(wrapper.html());
    expect(wrapper.find('.leaderboard-element').map((node) => node.text())).toHaveLength(2);
  });
});

/* test('Add friend results in API call.', async () => {
  await screen.findByText('leaderboard-not-friend');
  fireEvent(
    screen.getByText('leaderboard-not-friend'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
}); */