import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import React from 'react';
import { mobileMenuListItem } from '../../../Utilities/motionVariants';

interface Props {
  link: string;
  toggle: any;

  name?: string;
  icon?: any;
}
export const MobileNavItem = (props: Props) => {
  const { link, name, icon, toggle } = props;
  return (
    <>
      {/* Icon */}
      <motion.div variants={mobileMenuListItem}>
        <FontAwesomeIcon className="" icon={icon} />
      </motion.div>
      {/* Text */}
      <motion.div variants={mobileMenuListItem} className="col-start-2">
        <Link onClick={toggle} to={link} aria-label={name}>
          {name}
        </Link>
      </motion.div>
    </>
  );
};
