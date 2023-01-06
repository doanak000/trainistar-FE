import classNames from 'classnames'
import dayjs from 'dayjs'
import _ from 'lodash'
import React, { useRef } from 'react'

import styled from 'styled-components'

const StyledBackground = styled.div`
  h4 {
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  &.bg-9 {
    h4 {
      color: #1677ff !important;
      text-shadow: none;
    }
  }
`

const StyledItem = styled.div`
  &:hover {
    ${StyledBackground} {
      transform: scale(1.2);
    }
  }
`

export const CourseItem = ({ course }) => {
  const { nameCourse, description, startDate, finishDate } = course

  const r = useRef(_.random(11) + 1).current

  return (
    <StyledItem className='bg-white border shadow-sm rounded-md p-4 h-full space-y-2 overflow-hidden hover:shadow-lg duration-300 transition-all hover:border-primary-500 cursor-pointer'>
      <div className='-mx-4 -mt-4 select-none overflow-hidden'>
        <StyledBackground className={classNames('flex w-full h-44 bg-red-50 bg-cover items-center justify-center p-4 duration-300 transition-all', `bg-${r}`)} style={{ backgroundImage: `url('/images/backgrounds/bg-${r}.png')` }}>
          <h4 className='font-semibold text-lg text-center'>{nameCourse}</h4>
        </StyledBackground>
      </div>

      <div className='pt-2'>
        <h4 className='font-semibold text-base'>{nameCourse}</h4>
        <div>{dayjs(startDate).format('ll')} - {dayjs(finishDate).format('ll')}</div>
      </div>

      <p className='text-gray-500'>{description}</p>
    </StyledItem>
  )
}
