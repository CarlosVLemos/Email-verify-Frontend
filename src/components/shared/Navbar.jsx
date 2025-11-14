'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Análise de Emails', path: '/', icon: '📧' },
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white dark:bg-dark-900 shadow-lg border-b border-gray-200 dark:border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0" onClick={closeMobileMenu}>
            <div className="bg-primary-500 p-1.5 sm:p-2 rounded-lg shadow-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Email Intelligence</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden lg:block">Análise Inteligente de Emails</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-base font-bold text-gray-900 dark:text-white">Email Intel</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-3 lg:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm lg:text-base ${
                  pathname === item.path
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-dark-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="mr-1.5 lg:mr-2 text-base lg:text-lg">{item.icon}</span>
                <span className="hidden lg:inline">{item.name}</span>
                <span className="lg:hidden">{item.name.split(' ')[0]}</span>
              </Link>
            ))}
            
            {/* Theme Toggle Desktop */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors ml-2"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <span className="text-xl lg:text-2xl">☀️</span>
              ) : (
                <span className="text-xl lg:text-2xl">🌙</span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <span className="text-xl">☀️</span>
              ) : (
                <span className="text-xl">🌙</span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-3 space-y-2 border-t border-gray-200 dark:border-dark-700">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  pathname === item.path
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-dark-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span className="text-base">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
