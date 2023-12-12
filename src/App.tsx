import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import NavbarItem from './models/NavbarItem';
import GameFeedPage from './pages/GameFeedPage/GameFeedPage';

function App() {
  const navbarItems: NavbarItem[] = [
    { title: 'Top Games', category: 'top' },
    { title: 'New Games', category: 'new' },
    { title: 'Slots', category: 'slots' },
    { title: 'Jackpots', category: 'jackpot' },
    { title: 'Live', category: 'live' },
    { title: 'Blackjack', category: 'blackjack' },
    { title: 'Roulette', category: 'roulette' },
    { title: 'Table', category: 'table' },
    { title: 'Poker', category: 'poker' },
    { title: 'Other', category: 'other' }
  ];

  const [selectedItem, setSelectedItem] = useState<NavbarItem | null>(navbarItems[0]);

  const handleItemClick = (item: NavbarItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="App">
      <Navbar
        navbarItems={navbarItems}
        selectedItem={selectedItem}
        handleItemClick={handleItemClick}
      />
      <GameFeedPage selectedCategory={selectedItem?.category!} />
    </div>
  );
}

export default App;
