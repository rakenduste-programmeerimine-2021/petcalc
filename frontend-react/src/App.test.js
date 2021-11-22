import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);

  const someText = screen.getByText(/some/i);
  const h2Text = screen.queryByText(/h2/i);

  expect(someText).toBeInTheDocument();
  expect(h2Text).toBeNull();
});
