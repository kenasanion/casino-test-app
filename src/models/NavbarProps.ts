import NavbarItem from "./NavbarItem";

interface NavbarProps {
    handleItemClick: (item: NavbarItem) => void;
    navbarItems: NavbarItem[];
    selectedItem: NavbarItem | null;
}

export default NavbarProps;
