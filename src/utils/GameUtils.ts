import GameModel from "../models/GameModel";

/**
 * Utils class containing helper methods for games.
 */
class GameUtils {
    static customSort(gameA: GameModel, gameB: GameModel): number {
        const categories = ["Top", "New"];

        const hasTopOrNewA = gameA.categories.some(category => categories.includes(category));
        const hasTopOrNewB = gameB.categories.some(category => categories.includes(category));

        if (hasTopOrNewA || hasTopOrNewB) {
          return hasTopOrNewA ? -1 : 1;
        }

        const sortedCategoriesA = gameA.categories.sort().join(',');
        const sortedCategoriesB = gameB.categories.sort().join(',');

        return sortedCategoriesA.localeCompare(sortedCategoriesB);
      }

      static sortGames(games: GameModel[]): GameModel[] {
        return games.slice().sort(GameUtils.customSort);
      }
}

export default GameUtils;
