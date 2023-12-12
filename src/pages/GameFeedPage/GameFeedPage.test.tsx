// GameFeedPage.test.tsx
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameFeedPage from './GameFeedPage';
import GameService from '../../services/GameService';

// Mocking the GameService module
jest.mock('../../services/GameService', () => ({
  fetchGames: jest.fn(() => Promise.resolve([])),
  fetchJackpots: jest.fn(() => Promise.resolve([])),
}));

describe('GameFeedPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<GameFeedPage selectedCategory="exampleCategory" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches games and jackpots on mount', async () => {
    render(<GameFeedPage selectedCategory="exampleCategory" />);
    expect(GameService.fetchGames).toHaveBeenCalled();
    expect(GameService.fetchJackpots).toHaveBeenCalled();
    // You can add more assertions based on your component's behavior
  });

  it('fetches jackpots periodically', async () => {
    jest.useFakeTimers();
    render(<GameFeedPage selectedCategory="exampleCategory" />);
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(GameService.fetchJackpots).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });
});
