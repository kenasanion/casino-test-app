import GameModel from "./GameModel";
import Jackpot from "./Jackpot";

interface GameFeedState {
    games: GameModel[];
    jackpots: Jackpot[];
    isLoading: boolean;
    error: string | null;
    selectedCategory: string;
}

export default GameFeedState;
