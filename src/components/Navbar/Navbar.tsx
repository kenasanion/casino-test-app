import React, { useEffect, useState } from 'react';
import NavbarItem from '../../models/NavbarItem';
import './Navbar.css';

interface NavbarProps {
    handleItemClick: (item: NavbarItem) => void;
    navbarItems: NavbarItem[];
    selectedItem: NavbarItem | null;
}

/**
 * Represents the navbar component.
 * @param NavbarProps the navbar related properties
 * @returns the navbar component
 */
const Navbar: React.FC<NavbarProps> = ({ navbarItems, handleItemClick, selectedItem }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
          setIsMobileMenuOpen(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="navbar">
            <div className="navbar-header">
                <div className="hamburger-menu" onClick={toggleMobileMenu}>
                &#9776;
                </div>
            </div>
            {isMobileMenuOpen && (
                <ul className="navbar-items">
                    {
                        navbarItems.map((menu) =>
                        <li key={menu.category} className={`navbar-item ${selectedItem?.category === menu.category ? 'selected' : ''}`}
                            onClick={() => handleItemClick(menu)}>
                            {menu.title}
                        </li>)
                    }
                </ul>
            )}
        </div>
    );
};

export default Navbar;
