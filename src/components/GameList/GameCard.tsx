import GameModel from "../../models/GameModel";
import './GameCard.css'

/**
 * Represents a structured game card.
 * @param param0 the game properties
 * @returns
 */
const GameCard: React.FC<{ game: GameModel, jackpot: number | undefined, currentCategory: string }> = ({ game, jackpot, currentCategory }) => {
    const featuredIndex = game.categories.findIndex(c => c.toLowerCase() === "top" || c.toLowerCase() === 'new');
    let showRibbon = false;
    let featuredTag = '';

    if (featuredIndex > -1) {
        featuredTag = game.categories[featuredIndex].toLowerCase();
        showRibbon = featuredIndex !== -1 && !currentCategory.toLowerCase().includes(featuredTag);
    }

    return (
        <div className="game-card" style={{ backgroundImage: `url(${game.image})` }} >
            {
                showRibbon &&
                (<div className="game-card-ribbon">
                    {featuredTag}
                </div>)
            }
            {
                jackpot && jackpot > 0 && (
                    (<div className="jackpot">
                        JACKPOT PRICE £ {jackpot.toLocaleString()}
                    </div>)
                )
            }
            <div className="game-card-overlay">
                <div className="game-card-title">{ game.name }</div>
                <div className="play-button">► Play</div>
            </div>
        </div>
    );
}

export default GameCard;
