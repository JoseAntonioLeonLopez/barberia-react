import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import ThemeToggle from "../../Global Components/ThemeToggle";
import LogoutButton from "../../Global Components/LogoutButton";

const NavbarComponent: React.FC = () => {

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <Navbar
      isBlurred
      isBordered
      height="70px"
      className="bg-barber-bg dark:bg-dark-mode-bg text-lg font-barber dark:text-dark-mode-text"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="desktop:hidden"
          onClick={handleMenuToggle}
        />
      </NavbarContent>

      <NavbarContent justify="end" className="hidden desktop:flex gap-4">
        <NavbarItem>
          <LogoutButton/>
        </NavbarItem>
      </NavbarContent>

      {/* Menú móvil (visible solo en pantallas pequeñas) */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-dark-mode-bg z-50 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <NavbarMenu>
          <NavbarMenuItem>
            <RouterLink
              to="/logout"
              className="w-full text-lg text-barber-danger dark:text-red-400"
              onClick={handleMenuItemClick}
            >
              Cerrar sesión
            </RouterLink>
          </NavbarMenuItem>
        </NavbarMenu>
      </div>

      <ThemeToggle />
    </Navbar>
  );
};

export default NavbarComponent;
