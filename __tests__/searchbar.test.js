/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';

import Searchbar from '../client/src/components/Searchbar.jsx';
import Predictions from '../client/src/components/Predictions.jsx';

beforeEach(() => {
  render(<Searchbar />);
});

afterEach(() => {
  cleanup();
});

test('Searchbar renders correctly', () => {
  const placeholder = screen.getByPlaceholderText('Search...');
  expect(placeholder).toBeTruthy();
});