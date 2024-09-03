import React, { useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
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
  const location = useLocation();
  const currentPath = location.pathname;

  const [isMenuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Citas", href: "/dashboard" },
    { label: "Usuarios", href: "/dashboard/users" },
  ];

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

      <NavbarContent className="hidden desktop:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href} isActive={currentPath === item.href}>
            <RouterLink
              to={item.href}
              className={`text-lg ${
                currentPath === item.href
                  ? "text-barber-primary font-bold"
                  : "text-gray-700 dark:text-dark-mode-text"
              }`}
            >
              {item.label}
            </RouterLink>
          </NavbarItem>
        ))}
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
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <RouterLink
                to={item.href}
                className={`w-full text-lg ${
                  currentPath === item.href
                    ? "text-barber-primary font-bold"
                    : "text-gray-700 dark:text-dark-mode-text"
                }`}
                onClick={handleMenuItemClick}
              >
                {item.label}
              </RouterLink>
            </NavbarMenuItem>
          ))}
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
