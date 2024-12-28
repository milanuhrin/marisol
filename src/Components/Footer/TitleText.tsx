import React from 'react';

export const TitleText = ({
  headerStyle,
  children,
}: {
  headerStyle?: string;
  children: React.ReactNode;
}) => {
  return (
    <h1
      className={`${headerStyle} from-snakeGr1 to-snakeGr2 bg-gradient-to-r bg-clip-text text-3xl font-extrabold text-transparent`}
    >
      {children}
    </h1>
  );
};
