/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {BrowserRouter} from 'react-router-dom';

import Navbar from '../client/src/components/Navbar.jsx';

afterEach(() => {
  cleanup();
});

describe('Test Navbar Component', () => {
  test('Navbar renders correctly', () => {
    render(<BrowserRouter><Navbar /></BrowserRouter>);
    const leaderboard = screen.getByText(/Leaderboard/i);
    const portfolio = screen.getByText(/Portfolio/i);
    const stocks = screen.getByText(/Find Stocks/i);
    const friends = screen.getByText(/Friends/i);
    expect(leaderboard).toBeTruthy();
    expect(portfolio).toBeTruthy();
    expect(stocks).toBeTruthy();
    expect(friends).toBeTruthy();
  });
  test('Changes classname on click and confirms that only one element is highlighted at a time', async () => {
    const {container} = render(<BrowserRouter><Navbar /></BrowserRouter>);
    const portfolio = screen.getByText(/Portfolio/i);
    const stocks = screen.getByText(/Find Stocks/i);
    const friends = screen.getByText(/Friends/i);
    const leaderboard = screen.getByText(/Leaderboard/i);

    userEvent.click(portfolio);
    expect(container.getElementsByClassName('diamond-blue').length).toBe(1);

    userEvent.click(stocks);
    expect(container.getElementsByClassName('diamond-blue').length).toBe(1);

    userEvent.click(friends);
    expect(container.getElementsByClassName('diamond-blue').length).toBe(1);

    userEvent.click(leaderboard);
    expect(container.getElementsByClassName('diamond-blue').length).toBe(1);
  });
});