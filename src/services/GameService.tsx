import GameModel from "../models/GameModel";
import axios from "axios";
import Jackpot from "../models/Jackpot";

/**
 * Service class containing fetch operations related to games.
 */
class GameService {
  static fetchGames = async (): Promise<GameModel[]> => {
    try {
      const response = await axios.get('http://stage.whgstage.com/front-end-test/games.php');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  static fetchJackpots = async (): Promise<Jackpot[]> => {
    try {
      const response = await axios.get('http://stage.whgstage.com/front-end-test/jackpots.php');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}

export default GameService;
