// MobileNav.tsx
import { MenuIconToggle } from 'Components/Navigation/Mobile/MenuIconToggle';
import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import {
  mobileMenuItems,
  mobileMenuListItem,
  sidebarVariants,
} from 'Utilities/motionVariants';
import { MobileNavItem } from './MobileNavItem';

// i18n + data
import { useI18n } from 'i18n/LanguageProvider';
import { getMenuItems } from 'Utilities/Data';
import { LanguageSwitcher } from 'Components/LanguageSwitcher';

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const MobileNav = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  const menuRef = useRef<HTMLElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const { lang, t } = useI18n();
  const menuItems = getMenuItems(lang);

  const handleMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside (ignore inputs and the toggle button)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.closest('input') ||
        target.closest('textarea') ||
        menuRef.current?.contains(target) ||
        toggleButtonRef.current?.contains(target)
      ) {
        return;
      }

      setIsMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [setIsMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const firstMenuItem = menuRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    firstMenuItem?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      setIsMenuOpen(false);
      toggleButtonRef.current?.focus();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <motion.div
      className="relative flex w-full items-center justify-between py-3 px-6 lg:hidden"
      initial={false}
      animate={isMenuOpen ? 'open' : 'closed'}
    >
      {/* Menu Toggle Button */}
      <button
        ref={toggleButtonRef}
        type="button"
        onClick={handleMenuToggle}
        className="relative z-30 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#1f1f1f]"
        aria-controls="mobile-primary-navigation"
        aria-expanded={isMenuOpen}
        aria-label={
          isMenuOpen ? t('navigation.close_menu') : t('navigation.open_menu')
        }
      >
        <MenuIconToggle />
      </button>

      {/* Language Switcher - moved to top right in main top bar */}
      <div className="flex gap-1">
        <LanguageSwitcher className="flex flex-row gap-1" />
      </div>

      {/* Sidebar Background Container */}
      <motion.nav
        ref={menuRef}
        id="mobile-primary-navigation"
        aria-label={t('navigation.mobile_label')}
        aria-hidden={!isMenuOpen}
        className={`absolute inset-y-0 right-0 z-[20] flex h-[1000px] w-[250px] items-start bg-black text-white ${
          isMenuOpen ? 'pointer-events-auto mobile-menu' : 'pointer-events-none'
        }`}
        variants={sidebarVariants}
        style={{ visibility: isMenuOpen ? 'visible' : 'hidden' }}
      >
        {/* Removed LanguageSwitcher from sidebar */}

        {/* Brand logo */}
        <motion.div
          className="absolute top-[1.5rem] left-1/2 transform -translate-x-1/2"
          variants={mobileMenuListItem}
        >
          <img
            src="https://dznnrbng6qb50.cloudfront.net/images/landing/logo.png"
            alt="Marisol Logo"
            className="w-[60px] h-auto"
          />
        </motion.div>

        {/* Line Divider */}
        <motion.div className="absolute border-b-[1px] border-gmailGreyText top-[5rem] h-[2rem] w-full" />

        {/* Menu Items Grid */}
        <motion.div
          className="ml-[2rem] grid grid-cols-1 gap-x-[1rem] gap-y-[2rem] absolute top-[8rem] z-50"
          variants={mobileMenuItems}
        >
          {/* Nav Items */}
          {menuItems.map(({ name, link, icon, action }, i) => (
            <MobileNavItem
              toggle={() => setIsMenuOpen(false)}
              link={link ?? ''}
              name={name}
              icon={icon}
              key={i}
            />
          ))}
        </motion.div>
      </motion.nav>
    </motion.div>
  );
};
