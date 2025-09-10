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
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const { lang } = useI18n();
  const menuItems = getMenuItems(lang);

  // Function to toggle the menu safely
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents event bubbling
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

  return (
    <motion.div
      className="relative flex w-full items-center justify-between py-3 px-6 sm:hidden"
      initial={false}
      animate={isMenuOpen ? 'open' : 'closed'}
    >
      {/* Menu Toggle Button */}
      <button ref={toggleButtonRef} onClick={handleMenuToggle}>
        <MenuIconToggle toggle={handleMenuToggle} />
      </button>

      {/* Sidebar Background Container */}
      <motion.div
        ref={menuRef}
        className={`absolute inset-y-0 text-gmailSilverText right-0 z-[20] flex h-[1000px] w-[250px] items-start bg-gradient-to-br from-[#242424] to-[#373737] ${
          isMenuOpen ? 'pointer-events-auto mobile-menu' : 'pointer-events-none'
        }`}
        variants={sidebarVariants}
      >
        {/* ✅ Clickable Logo Redirects to Cognito Login */}
        <motion.div
          className="absolute top-[1.5rem] left-1/2 transform -translate-x-1/2 cursor-pointer"
          variants={mobileMenuListItem}
          onClick={() => {
            window.location.href =
              'https://marisol.auth.us-east-1.amazoncognito.com/login?client_id=hrdsud6flksjbei479jcadat0&response_type=code&scope=email+openid+profile&redirect_uri=https://admin.marisol.sk/';
          }}
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

        {/* ✅ Bottom bar: language flags (a sem vieš pridať aj tel. číslo, ak ho chceš mať vedľa vlajok) */}
        <div className="absolute bottom-4 left-0 w-full px-4">
          <div className="flex items-center justify-end">
            {/* Ak chceš mať vedľa aj telefón:
            <a
              href="tel:+421902217449"
              className="mr-3 text-white/90"
              onClick={() => setIsMenuOpen(false)}
              aria-label={lang === 'sk' ? 'Zavolať' : 'Call'}
            >
              +421 902 217 449
            </a>
            */}
            <LanguageSwitcher />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};