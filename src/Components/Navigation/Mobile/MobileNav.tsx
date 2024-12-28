import { MenuIconToggle } from 'Components/Navigation/Mobile/MenuIconToggle';
import { motion } from 'framer-motion';
import { StaticImage } from 'gatsby-plugin-image';
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
      {/* Logo */}
      <StaticImage
        src="../../../images/logo-darkGrey.png"
        alt="logo"
        className=" max-w-[4rem]"
        placeholder="none"
      />
      {/* MenuIconToggle */}
      <MenuIconToggle toggle={() => setIsMenuOpen(!isMenuOpen)} />
      {/* Sidebard Background Container */}
      <motion.div
        className={
          'absolute inset-y-0 text-gmailSilverText right-0 z-[20] flex h-[1000px] w-[250px] items-start bg-gradient-to-br from-[#242424] to-[#373737]'
        }
        variants={sidebarVariants}
      >
        {/* GRID */}
        <motion.div
          className=" ml-[2rem] grid grid-cols-1  gap-x-[1rem] gap-y-[2rem] absolute top-[5.5rem]   z-50 "
          variants={mobileMenuItems}
        >
          {/* Title */}
          <motion.div
            variants={mobileMenuListItem}
            className="mb-[1rem] col-start-2 text-lg w-full font-sans top-[5rem]"
          >
            Milan Uhrin
          </motion.div>
          {/* Nav Items */}
          {menuItems.map(({ name, link, icon }, i) => (
            <MobileNavItem
              toggle={() => setIsMenuOpen(!isMenuOpen)}
              link={link}
              name={name}
              icon={icon}
              key={i}
            />
          ))}
        </motion.div>
        {/* line divider */}
        <motion.div className="absolute border-b-[1px] border-gmailGreyText  top-[6rem] h-[2rem] w-full" />
      </motion.div>
    </motion.div>
  );
};
