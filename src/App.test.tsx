import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('app component renders correctly and handles item click', () => {
  const { getByText } = render(<App />);

  expect(getByText('Top Games')).toBeInTheDocument();
  fireEvent.click(getByText('New Games'));
  expect(getByText('New Games')).toHaveClass('selected');
});
