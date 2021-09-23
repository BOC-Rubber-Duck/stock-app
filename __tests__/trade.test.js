/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({adapter: new Adapter()});
import {BrowserRouter} from 'react-router-dom';
import { render, screen, cleanup, waitForElement, fireEvent } from '@testing-library/react';

import axiosMock from 'axios';

import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import axios from 'axios';

import App from '../client/src/components/App.jsx';
import Trade from '../client/src/components/Trade.jsx';
const { sampleState } = require('../sampleData/sampleState.js');
const { stockSelected, user, action } = sampleState;

jest.mock('axios');

// mock data
const data = {
  config: {
    url: "image-url",
  },
};

beforeEach(() => {
  // render(<Trade stockSelected={stockSelected} user={user} action={action} />);
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test('Trade component should render and correctly handle props', async () => {
  const sampleProp = {test: 'test'};
  const wrapper = await Promise.resolve(mount(<Trade user={user} stockSelected={stockSelected} action={action} />));
  expect(wrapper.prop('action')).toEqual('buy');
});

test('Display number of stocks to be traded', async () => {
  await act(async () => {
    render(<Trade stockSelected={stockSelected} user={user} action={action} />);
    let numberField = screen.getByTestId('shares');
    expect(numberField).toBeTruthy();
    await userEvent.type(numberField, '6');
    expect(numberField).toHaveValue(6);
  });
});

// jest.mock('axios', () => {
//   return {
//     __esModule: true,
//     default: jest.fn()
//   };
// });

// describe('MockComponentEnzyme', ()=>{
//   it('should get data', (done) => {
//     const axios = require('axios');
//     jest.spyOn(axios, 'default').mockResolvedValue({
//       name: 'abc'
//     });

//     let appMock = new App;
//     const handleTrade = appMock.handleTrade;

//     const wrapper = shallow(<Trade stockSelected={stockSelected} user={user} action={action} handleTrade={handleTrade} />, {
//       disableLifecycleMethods: true
//     });
//     wrapper.instance().handleSubmit();
//     process.nextTick(()=>{
//       expect(wrapper.state('error')).toBeFalsy();
//       expect(wrapper.state().name).toEqual('abc');
//       done();
//     });
//   });
// });

  // it('should handle error data', (done) => {
  //   const axios = require('axios');
  //   jest.spyOn(axios, 'default').mockRejectedValue()
  //   const wrapper = shallow(<MockComponent/>, {
  //     disableLifecycleMethods: true
  //   });
  //   wrapper.instance().getData();
  //   process.nextTick(()=>{
  //     expect(wrapper.state('error')).toBeTruthy();
  //     done();
  //   })
  // })
// });

// test('Trade post query sends proper parameters', async () => {
//   await act(async () => {
//     await axios.post.mockImplementationOnce(() => Promise.resolve(data));
//     let appMock = new App;
//     const handleTrade = appMock.handleTrade;

//     let mountTrade = await render(<Trade stockSelected={stockSelected} user={user} action={action} handleTrade={handleTrade} />);
//     // console.log(mountTrade.html());
//     await mountTrade.find('.trade-action').invoke('onClick')();
//     // mountTrade.update();
//     await expect(axios.post).toHaveBeenCalledTimes(1);
//   });

//   // await expect(axios.post).toHaveBeenCalledTimes(1);
//   // Trade Component:
//   // handleTrade(stockSymbol, shares, action)
//   // expect(mount(<Trade stockSelected={stockSelected}/>).is('.trade-container')).toBe(true);
// });