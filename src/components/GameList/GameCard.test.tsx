import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameCard from './GameCard';
import GameModel from '../../models/GameModel';

describe('GameCard Component', () => {
    const mockGame: GameModel = { categories: ['fun', 'roulette'], id: 'test-game', image: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', name: 'test' };
    const mockJackpot = 1000;
    const mockCurrentCategory = 'casino';

    it('renders without crashing', () => {
        render(<GameCard game={mockGame} jackpot={mockJackpot} currentCategory={mockCurrentCategory} />);
    });

    it('renders game card title', () => {
        render(<GameCard game={mockGame} jackpot={mockJackpot} currentCategory={mockCurrentCategory} />);
        expect(screen.getByText(mockGame.name)).toBeInTheDocument();
    });

    it('renders play button', () => {
        render(<GameCard game={mockGame} jackpot={mockJackpot} currentCategory={mockCurrentCategory} />);
        expect(screen.getByText('► Play')).toBeInTheDocument();
    });

    it('renders jackpot section when jackpot is greater than 0', () => {
        render(<GameCard game={mockGame} jackpot={mockJackpot} currentCategory={mockCurrentCategory} />);
        expect(screen.getByText(`JACKPOT PRICE £ ${mockJackpot.toLocaleString()}`)).toBeInTheDocument();
    });

    it('renders ribbon when game is featured and not in current category', () => {
        const featuredGame: GameModel = { categories: ['top', 'roulette'], id: 'test-game', image: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', name: 'test' };
        render(<GameCard game={featuredGame} jackpot={mockJackpot} currentCategory={'New Games'} />);

        expect(screen.queryByTestId('game-card-ribbon')).toBeInTheDocument();
    });

    it('does not render ribbon when game is not featured', () => {
        render(<GameCard game={mockGame} jackpot={mockJackpot} currentCategory={mockCurrentCategory} />);
        expect(screen.queryByTestId('game-card-ribbon')).toBeNull();
    });
});
