import { Spin } from 'antd'
import React from 'react'

export const LoadingFullscreen = ({ tip = 'Loading...' }) => {
  return (
    <div className='fixed left-0 top-0 w-screen h-screen z-40 flex items-center justify-center bg-white bg-opacity-50'>
      <Spin size='large' tip={tip} />
    </div>
  )
}
