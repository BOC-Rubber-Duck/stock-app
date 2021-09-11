/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({adapter: new Adapter()});

import {BrowserRouter} from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import App from '../client/src/components/App.jsx';
import Navbar from '../client/src/components/Navbar.jsx';
import Login from '../client/src/components/Login.jsx';
import Trade from '../client/src/components/Trade.jsx';
import Leaderboard from '../client/src/components/Leaderboard.jsx';


beforeEach(() => {
  render(<BrowserRouter><App /></BrowserRouter>);
});

afterEach(() => {
  cleanup();
});

test('Top level App components render', () => {
  expect(shallow(<Navbar />).is('.navbar-container')).toBe(true);
  expect(shallow(<Login />).is('.login-container')).toBe(true);
  expect(shallow(<Trade />).is('.trade-container')).toBe(true);
  expect(shallow(<Leaderboard />).is('.leaderboard-container')).toBe(true);
});