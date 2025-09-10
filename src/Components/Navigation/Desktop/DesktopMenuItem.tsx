// DesktopMenuItem.tsx
import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type DesktopMenuItemProps = {
  name: string;                    // už je v správnom jazyku
  link?: string;                   // interný alebo externý
  icon?: any;                      // FontAwesome icon (optional)
  action?: () => void;             // napr. tel: call
  className?: string;
};

export const DesktopMenuItem: React.FC<DesktopMenuItemProps> = ({
  name,
  link,
  icon,
  action,
  className = '',
}) => {
  const base =
    'text-silver hover:font-bold hover:text-cyan-500 hover:text-lg cursor-pointer transition duration-300';

  const content = (
    <>
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      <span>{name}</span>
    </>
  );

  if (action) {
    return (
      <button
        type="button"
        onClick={action}
        aria-label={name}
        className={`${base} ${className}`}
      >
        {content}
      </button>
    );
  }

  if (link) {
    if (link.startsWith('/')) {
      return (
        <Link to={link} aria-label={name} className={`${base} ${className}`}>
          {content}
        </Link>
      );
    }
    return (
      <a href={link} aria-label={name} className={`${base} ${className}`}>
        {content}
      </a>
    );
  }

  // fallback: inertný text
  return (
    <span aria-label={name} className={`${base} ${className}`}>
      {content}
    </span>
  );
};