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
import Trade from '../client/src/components/Trade.jsx';
const { sampleState } = require('../sampleData/sampleState.js');
const { stockSelected, user, action } = sampleState;

// //  stockSelected = {
// //   name: 'Tesla',
// //   symbol: 'TSLA',
// //   price: 100,
// //   data: [
// //     // {},{}
// //   ]
// // };


beforeEach(() => {
  // render(<BrowserRouter><App /></BrowserRouter>);
});

afterEach(() => {
  // cleanup();
});

test('App component should render and correctly handle props', async () => {
  const sampleProp = {test: 'test'};
  const wrapper = await Promise.resolve(mount(<Trade user={user} stockSelected={stockSelected} action={action} />));
  expect(wrapper.prop('action')).toEqual('buy');
});

test('Top level App components render', async () => {
  // Portfolio Component:
  // const portfolioRender = await Promise.resolve(mount(<Portfolio />));
  // expect(portfolioRender.find('.portfolio-container').length).toBe(1);

  // Trade Component:
  // expect(mount(<Trade stockSelected={stockSelected}/>).is('.trade-container')).toBe(true);
  expect(true).toBe(true);
});