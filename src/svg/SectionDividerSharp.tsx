import React from 'react'

export const SectionDividerSharp = ({
   fill = 'white',
   containerStyles,
}: {
   fill?: string
   containerStyles?: string
}) => {
   const nieco = 2
   return (
      <div
         className={`${containerStyles} custom-shape-divider-bottom-1643366277`}>
         <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'>
            <path
               d='M1200 0L0 0 598.97 114.72 1200 0z'
               className=''
               fill={fill}></path>
         </svg>
      </div>
   )
}
