import { MenuIconToggle } from 'Components/Navigation/Mobile/MenuIconToggle';
import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { menuItems } from 'Utilities/Data';
import {
  mobileMenuItems,
  mobileMenuListItem,
  sidebarVariants,
} from 'Utilities/motionVariants';
import { MobileNavItem } from './MobileNavItem';

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const MobileNav = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Function to toggle the menu safely
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents event bubbling
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close menu when clicking outside, but ignore inputs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // ✅ Ignore clicks inside input, textarea, or inside the menu itself
      if (
        target.closest("input") ||
        target.closest("textarea") ||
        menuRef.current?.contains(target) ||
        toggleButtonRef.current?.contains(target)
      ) {
        return;
      }

      // Otherwise, close the menu
      setIsMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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
          isMenuOpen ? "pointer-events-auto mobile-menu" : "pointer-events-none"
        }`}
        variants={sidebarVariants}
      >
        {/* ✅ Clickable Logo Redirects to Cognito Login */}
        <motion.div
          className="absolute top-[1.5rem] left-1/2 transform -translate-x-1/2 cursor-pointer"
          variants={mobileMenuListItem}
        >
          <a
            href="https://marisol.auth.us-east-1.amazoncognito.com/login?client_id=hrdsud6flksjbei479jcadat0&response_type=code&scope=email+openid+profile&redirect_uri=https://main.d39j8o309sk3xb.amplifyapp.com/"
            aria-label="Login Page"
          >
            <img
              src="https://dznnrbng6qb50.cloudfront.net/images/landing/logo.png"
              alt="Marisol Logo"
              className="w-[60px] h-auto"
            />
          </a>
        </motion.div>

        {/* Line Divider */}
        <motion.div className="absolute border-b-[1px] border-gmailGreyText top-[5rem] h-[2rem] w-full" />

        {/* Menu Items Grid */}
        <motion.div
          className="ml-[2rem] grid grid-cols-1 gap-x-[1rem] gap-y-[2rem] absolute top-[8rem] z-50"
          variants={mobileMenuItems}
        >
          {/* Nav Items */}
          {menuItems.map(({ name, link, icon }, i) => (
            <MobileNavItem
              toggle={() => setIsMenuOpen(false)}
              link={link ?? ''}
              name={name}
              icon={icon}
              key={i}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};