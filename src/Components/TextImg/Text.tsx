import React from 'react';
import { TitleText } from '../Footer/TitleText';
interface Props {
  paragraphText?: string | React.ReactElement;
  paragraphStyle?: string;
  headerText?: string | React.ReactElement;
  headerStyle?: string;
  textWrapperStyle?: string;
}

export const Text = React.forwardRef((props: Props, ref: any) => {
  const {
    paragraphText,
    paragraphStyle,
    headerText,
    headerStyle,
    textWrapperStyle,
  } = props;
  return (
    // text wrapper
    <div
      className={`${textWrapperStyle} gap-2o5  z-10 flex  w-full flex-col self-center justify-self-center text-center sm:w-[100%]`}
      ref={ref}
    >
      {/* Header */}
      {headerText && (
        <TitleText headerStyle={headerStyle}>{headerText}</TitleText>
      )}
      {/* Paragraph */}
      {paragraphText && (
        <p className={`${paragraphStyle} black  text-xl  `}>{paragraphText}</p>
      )}
    </div>
  );
});
