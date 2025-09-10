// MobileNavItem.tsx
import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { mobileMenuListItem } from 'Utilities/motionVariants';

export type MobileNavItemProps = {
  name: string;                 // už v správnom jazyku
  link: string;                 // môže byť interný aj externý
  icon?: any;                   // FontAwesome icon (optional)
  toggle: () => void;           // zatvorenie menu po kliknutí
  className?: string;
};

export const MobileNavItem: React.FC<MobileNavItemProps> = ({
  name,
  link,
  icon,
  toggle,
  className = '',
}) => {
  const base =
    'text-white/90 hover:text-white transition-colors flex items-center gap-2 text-lg';

  const content = (
    <>
      {icon && <FontAwesomeIcon icon={icon} />}
      <span>{name}</span>
    </>
  );

  // Animovaný wrapper (aby si nestratil existujúce varianty)
  if (link?.startsWith('/')) {
    return (
      <motion.div variants={mobileMenuListItem} className={className}>
        <Link to={link} aria-label={name} className={base} onClick={toggle}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (link) {
    return (
      <motion.div variants={mobileMenuListItem} className={className}>
        <a href={link} aria-label={name} className={base} onClick={toggle}>
          {content}
        </a>
      </motion.div>
    );
  }

  // fallback: napr. ak je to len tlačidlo bez linku
  return (
    <motion.button
      type="button"
      variants={mobileMenuListItem}
      className={`${base} ${className}`}
      onClick={toggle}
      aria-label={name}
    >
      {content}
    </motion.button>
  );
};