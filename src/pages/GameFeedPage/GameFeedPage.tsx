import { Component } from "react";
import GameService from "../../services/GameService";

import GameCard from "../../components/GameList/GameCard";
import GameFeedProps from "../../models/GameFeedProps";
import GameFeedState from "../../models/GameFeedState";
import './GameFeedPage.css';
import GameUtils from "../../utils/GameUtils";

/**
 * Structures a page that contains the list of games.
 */
class GameFeedPage extends Component<GameFeedProps, GameFeedState> {
  intervalId: NodeJS.Timer | null = null;

  constructor(props: GameFeedProps) {
    super(props);
    this.state = {
      games: [],
      jackpots: [],
      isLoading: false,
      error: null,
      selectedCategory: props.selectedCategory,
    };
  }


  componentDidMount() {
    this.fetchGames();

    // TODO: This is called twice.. Perhaps we can put it somewhere.
    this.fetchJackpots();

    this.intervalId = setInterval(() => {
      this.fetchJackpots();
    }, 10000);
  }


  fetchGames = async () => {
    this.setState({ isLoading: true });

    try {
      const games = await GameService.fetchGames();
      this.setState({ games, isLoading: false });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message, isLoading: false });
      }
    }
  };

  fetchJackpots = async () => {
    try {
      const jackpots = await GameService.fetchJackpots();
      this.setState({ jackpots });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message });
      }
    }
  };

  componentDidUpdate(prevProps: GameFeedProps) {
    if (this.props.selectedCategory !== prevProps.selectedCategory) {
      this.setState({ selectedCategory: this.props.selectedCategory });
    }
  }

  componentWillUnmount() {
    if (this.intervalId)
      clearInterval(this.intervalId);
  }

  render() {
    const { games, isLoading, error, selectedCategory } = this.state;

    if (isLoading) {
      return <div className="status-message">Loading...</div>;
    }

    if (error) {
      return <div className="status-message">Error: {error}</div>;
    }

    const filteredGames = games.filter((game) => {
      if (selectedCategory !== 'other') {
        return game.categories.includes(selectedCategory);
      } else {
        return ['ball', 'fun', 'virtual'].some(category => game.categories.includes(category));
      }
    });

    const sortedGames = GameUtils.sortGames(filteredGames);

    return (<>
      <div className="game-list">
        {sortedGames.map((game) => {
          const jackpot = this.state.jackpots.find(jackpot => jackpot.game === game.id);
          return <GameCard key={game.id} game={game} jackpot={jackpot?.amount} currentCategory={selectedCategory} />
        })}
      </div>
    </>);
  }


}

export default GameFeedPage;
