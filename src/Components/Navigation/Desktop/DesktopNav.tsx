// DesktopNav.tsx
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import React from 'react';
import { getMenuItems } from 'Utilities/Data';
import { container, desktopMenuItems } from 'Utilities/motionVariants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useI18n } from 'i18n/LanguageProvider';
import { LanguageSwitcher } from 'Components/LanguageSwitcher';

interface Props {}

export const DesktopNav = (props: Props) => {
  const { lang } = useI18n();
  const items = getMenuItems(lang);

  return (
    <>
      <motion.ul
        initial={'hidden'}
        animate={'show'}
        variants={container}
        className="z-20 hidden w-full items-center whitespace-nowrap px-3 lg:flex lg:justify-center lg:space-x-6"
      >
        {/* ✅ Navigation Menu Items (LEFT SIDE) */}
        {items.map((item, i) => (
          <motion.li
            className="text-silver hover:font-bold hover:text-cyan-500 hover:text-lg cursor-pointer transition duration-300"
            variants={desktopMenuItems}
            key={i}
            onClick={item.action || undefined}
          >
            {item.icon && <FontAwesomeIcon icon={item.icon} className="mr-2" />}

            {item.link && item.link.startsWith('/') ? (
              <Link to={item.link} aria-label={item.name}>
                {item.name}
              </Link>
            ) : item.link ? (
              <a href={item.link} aria-label={item.name}>
                {item.name}
              </a>
            ) : (
              <span aria-label={item.name}>{item.name}</span>
            )}
          </motion.li>
        ))}

        {/* ✅ Language flags */}
        <motion.li variants={desktopMenuItems} className="pl-2">
          <LanguageSwitcher />
        </motion.li>

      </motion.ul>
    </>
  );
};
