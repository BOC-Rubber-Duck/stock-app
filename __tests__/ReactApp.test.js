import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import App from '../client/src/components/App.jsx';


beforeEach(() => {
  render(<App />);
});

afterEach(() => {
  cleanup();
});

test('Top level App component renders', () => {
  expect(screen.getByTestId('app-main')).toBeInTheDocument();
});