import axios from 'axios';
import GameService from './GameService';

jest.mock('axios');

describe('GameService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchGames', () => {
    it('fetches successfully data from an API', async () => {
      const mockedGames = [{ id: 1, name: 'Game 1' }];
      (axios.get as jest.Mock).mockResolvedValue({ data: mockedGames });

      const result = await GameService.fetchGames();

      expect(result).toEqual(mockedGames);
    });

    it('handles errors when fetching data', async () => {
      const errorMessage = 'Network Error';
      (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(GameService.fetchGames()).rejects.toThrow(errorMessage);
    });
  });

  describe('fetchJackpots', () => {
    it('fetches successfully data from an API', async () => {
      const mockedJackpots = [{ id: 1, amount: 1000 }];
      (axios.get as jest.Mock).mockResolvedValue({ data: mockedJackpots });

      const result = await GameService.fetchJackpots();

      expect(result).toEqual(mockedJackpots);
    });

    it('handles errors when fetching data', async () => {
      const errorMessage = 'Network Error';
      (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(GameService.fetchJackpots()).rejects.toThrow(errorMessage);
    });
  });
});
