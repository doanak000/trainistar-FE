import classNames from 'classnames'
import dayjs from 'dayjs'
import _ from 'lodash'
import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar } from '../../../../components/avatar'

import styled from 'styled-components'
import { Rate, Tooltip } from 'antd'

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

export const CourseItem = ({ course, isViewDetails = false }) => {
  const { idCourse, nameCourse, description, teacherName, startDate, finishDate } = course

  const history = useHistory()

  const r = useRef(_.random(11) + 1).current

  const handleCourseClick = () => {
    if (isViewDetails) {
      return
    }

    history.push({
      pathname: `/course/${idCourse}`
    })
  }

  return (
    <StyledItem className={classNames('flex flex-col bg-white  shadow-sm p-4 h-full overflow-hidden hover:shadow-lg duration-300 transition-all hover:border-primary-500 cursor-pointer animate__fadeIn animate__animated', { 'rounded-md border': !isViewDetails, 'rounded-b-md border-b border-l border-r': isViewDetails })} onClick={handleCourseClick}>
      <div className='-mx-4 -mt-4 select-none overflow-hidden'>
        <StyledBackground className={classNames('flex w-full h-44 bg-red-50 bg-cover items-center justify-center p-4 duration-300 transition-all', `bg-${r}`)} style={{ backgroundImage: `url('/images/backgrounds/bg-${r}.png')` }}>
          <h4 className='font-semibold text-lg text-center'>{nameCourse}</h4>
        </StyledBackground>
      </div>

      <div className='mt-4'>
        <h4 className='font-semibold text-base'>{nameCourse}</h4>
        <div>{dayjs(startDate).format('ll')} - {dayjs(finishDate).format('ll')}</div>
      </div>

      <p className='text-gray-500 flex-grow mt-2'>{description}</p>

      <div className='border-t pt-4 -mx-4 px-4 mt-4 flex items-center justify-between'>
        <Tooltip title='Teacher' placement='right'>
          <div className='inline-flex items-center space-x-2'>
            <Avatar size={32} textSize='60%' fullName={teacherName || 'Teacher'} />
            <span className='leading-none font-medium'>{teacherName || 'Teacher'}</span>
          </div>
        </Tooltip>

        <div className='flex leading-none'>
          <Rate defaultValue={5} disabled />
        </div>
      </div>
    </StyledItem>
  )
}
