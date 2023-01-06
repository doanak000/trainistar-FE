import React from 'react'

import { getAvatarText, getColorFromText } from './utils'

export const Avatar = ({ size = 24, textSize = '70%', fullName, avatarTextLength = 2 }) => {
  const text = getAvatarText(fullName || 'Đại', avatarTextLength)

  return (
    <div className='flex items-center justify-center rounded-full font-medium' style={{ width: size, height: size, backgroundColor: getColorFromText(text) }}>
      <svg
        width={textSize}
        height={textSize}
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <text
          x='20'
          y='22'
          fontSize='24'
          fill='white'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          {text}
        </text>
      </svg>
    </div>
  )
}
