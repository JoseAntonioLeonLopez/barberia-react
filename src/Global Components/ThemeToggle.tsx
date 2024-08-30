import React, { useState, useEffect } from 'react';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('theme');
    return savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-barber-primary text-white dark:bg-barber-secondary"
      aria-label="Toggle theme"
      whileTap={{ scale: 0.9, rotate: 45 }} // Animación de escala y rotación al hacer clic
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // Suavizado de la animación
    >
      {isDarkMode ? <BsSunFill className="h-6 w-6" /> : <BsMoonFill className="h-6 w-6" />}
    </motion.button>
  );
};

export default ThemeToggle;
