"use client";

import { useState, useEffect } from 'react';
import Logo from './Logo';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Si el scroll es mayor a 50px, agregar la clase
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Agregar el event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup: remover el event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`text-center position-fixed top-0 left-0 right-0 w-100 transition-all duration-300 ${scrolled ? 'bg-header scroll-header' : 'py-lg-3 py-0'}`}>
      <Logo />
    </header>
  );
};

export default Header; 