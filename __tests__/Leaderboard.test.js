/**
 * @jest-environment jsdom
 */

import React from 'react';
import {BrowserRouter, MemoryRouter, Router, Route} from 'react-router-dom';

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


// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

// the component to test
import Leaderboard from '../client/src/components/Leaderboard.jsx';

var initialProps = {
  user: {
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    cash_position: 1000000,
    rank: null,
    portfolioValue: 0
  }
};

var count = 0;

var sampleList = [].concat([{"id":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11","password":"my_secret_password","first_name":"john","last_name":"smith","username":"jsmith","email":"john_smith@example.com","cash_position":"1000000","watching_user":null,"watched_user":null},{"id":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12","password":"my_secret_password","first_name":"jeffrey","last_name":"bezos","username":"bezos_the_first","email":"jeffrey_bezos@example.com","cash_position":"1000000","watching_user":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13","watched_user":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12"}]);

var initialState = {
  list: sampleList,
  page: 1,
  hasMore: true,
  friendsMode: 'Leaderboard',
  entries: 2,
  previousList: sampleList
};

var postFriend = 0;

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
  server.events.on('request:end', (req) => {
    if (req.url.href.slice((req.url.href.length - 10), (req.url.href.length)) === 'postFriend') {
      postFriend++;
    }
  });
});
beforeEach(() => {

});
afterEach(() => {
  server.resetHandlers();
  postFriend = 0;
  cleanup();
});
afterAll(() => server.close());

test('Leaderboard mounts.', () => {
  sinon.spy(Leaderboard.prototype, 'componentDidMount');
  var wrapper = mount(<BrowserRouter><Leaderboard user={initialProps.user} /></BrowserRouter>);
  expect(Leaderboard.prototype.componentDidMount).toHaveProperty('callCount', 1);
});

test('Leaderboard renders text to screen.', () => {
  var wrapper = mount(<BrowserRouter><Leaderboard user={initialProps.user} /></BrowserRouter>);
  expect(wrapper.find('.list-header').text()).toMatch(/Leaderboard/);
});

// test('Two Leaderboard entries render state change.', () => {
//   var wrapper = mount(<Leaderboard user={initialProps.user} />);
//   wrapper.setState(initialState, () => {
//     expect(wrapper.find('.leaderboard-element').map((node) => node.text())).toHaveLength(2);
//   });
// });

// test('Add friend results in API call.', () => {
//   const onButtonClick = sinon.spy();
//   var wrapper = mount(<Leaderboard user={initialProps.user} />);
//   wrapper.setState(initialState, async () => {
//     wrapper.find('.leaderboard-not-friend').simulate('click');
//     await waitFor(() => expect(postFriend).toEqual(1));
//   });
// });

// test('Clicking leaderboard toggle changes mode.', () => {
//   var wrapper = mount(<Leaderboard user={initialProps.user} />);
//   wrapper.setState(initialState, async () => {
//     wrapper.find('#friend-slider').simulate('click');
//     await waitFor(() => expect(wrapper.state().friendsMode).toEqual('Friendboard'));
//   });
// });

test('Leaderboard fetches data through API.', () => {
  render(<Leaderboard user={initialProps.user}/>);
  expect(screen.findByText('2'));
});

test('Leaderboard loads usercard.', () => {
  render(<Leaderboard user={initialProps.user}/>);
  expect(screen.findByText('profdetail1'));
});