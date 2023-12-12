import GameModel from '../models/GameModel';
import GameUtils from './GameUtils';

describe('GameUtils', () => {
  describe('customSort', () => {
    it('should correctly prioritize "Top" or "New" categories', () => {
      const gameA: GameModel = { id: '1', name: 'GameA', image: 'imgA.jpg', categories: ['Top'] };
      const gameB: GameModel = { id: '2', name: 'GameB', image: 'imgB.jpg', categories: ['Live'] };

      const result = GameUtils.customSort(gameB, gameA);

      expect(result).toBe(1);
    });
  });
});
