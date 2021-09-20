/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({adapter: new Adapter()});

import {BrowserRouter} from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import App from '../client/src/components/App.jsx';
import Portfolio from '../client/src/components/Portfolio.jsx';
import Navbar from '../client/src/components/Navbar.jsx';
import Login from '../client/src/components/Login.jsx';
import Trade from '../client/src/components/Trade.jsx';
import Leaderboard from '../client/src/components/Leaderboard.jsx';
import Searchbar from '../client/src/components/Searchbar.jsx';
import Friend from '../client/src/components/Friend.jsx';

const { sampleState } = require('../sampleData/sampleState.js');

const { stockSelected, user, action } = sampleState;

// const stockSelected = {
//   name: 'Tesla',
//   symbol: 'TSLA',
//   price: 100,
//   data: [
//     // {},{}
//   ]
// };


beforeEach(() => {
  render(<BrowserRouter><App /></BrowserRouter>);
});

afterEach(() => {
  cleanup();
});

test('App component should render and correctly handle props', async () => {
  const sampleProp = {test: 'test'};
  const wrapper = await Promise.resolve(mount(<App sampleProp={'test'} />));
  expect(wrapper.prop('sampleProp')).toEqual('test');
});

test('Top level App components render', async () => {
  // Friend Component:
  const friendRender = await Promise.resolve(mount(<Friend />));
  expect(friendRender.find('.fr-page').length).toBe(1);
  // Portfolio Component:
  const portfolioRender = await Promise.resolve(mount(<Portfolio />));
  expect(portfolioRender.find('.portfolio-container').length).toBe(1);
  // Navbar Component:
  expect(shallow(<Navbar />).is('.navbar-container')).toBe(true);
  // Login Component:
  expect(shallow(<Login />).is('.login-container')).toBe(true);
  // Trade Component:
  expect(shallow(<Trade stockSelected={stockSelected}/>).is('.trade-container')).toBe(true);
  // Leaderboard Component:
  const leaderboardRender = await Promise.resolve(shallow(<Leaderboard />).is('.leaderboard-container'));
  expect(leaderboardRender).toBe(true);
});