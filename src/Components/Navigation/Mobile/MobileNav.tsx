import { MenuIconToggle } from 'Components/Navigation/Mobile/MenuIconToggle';
import { motion } from 'framer-motion';
import React from 'react';
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

export const MobileNav = (props: Props) => {
  const { isMenuOpen, setIsMenuOpen } = props;
  return (
    <motion.div
      className="relative flex w-full items-center justify-between py-3 px-6 sm:hidden"
      initial={false}
      animate={isMenuOpen ? 'open' : 'closed'}
    >
      {/* Logo - Left Side */}
      <motion.img
        src="https://dznnrbng6qb50.cloudfront.net/images/landing/logo.png"
        alt="Marisol Logo"
        className="w-[120px] h-auto"
      />

      {/* MenuIconToggle - Right Side */}
      <MenuIconToggle toggle={() => setIsMenuOpen(!isMenuOpen)} className="ml-auto" />

      {/* Sidebar Background Container */}
      <motion.div
        className={
          'absolute inset-y-0 text-gmailSilverText right-0 z-[20] flex h-[1000px] w-[250px] items-start bg-gradient-to-br from-[#242424] to-[#373737]'
        }
        variants={sidebarVariants}
      >
        {/* Line Divider */}
        <motion.div className="absolute border-b-[1px] border-gmailGreyText top-[5rem] h-[2rem] w-full" />

        {/* GRID for Menu Items */}
        <motion.div
          className="ml-[2rem] grid grid-cols-1 gap-x-[1rem] gap-y-[2rem] absolute top-[6.5rem] z-50"
          variants={mobileMenuItems}
        >
          {/* Nav Items */}
          {menuItems.map(({ name, link, icon }, i) => (
            <MobileNavItem
              toggle={() => setIsMenuOpen(!isMenuOpen)}
              link={link ?? ''} // ✅ Fix TypeScript error
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