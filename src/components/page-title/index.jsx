import React from 'react'

export const PageTitle = ({ title, renderRight }) => {
  return (
    <div className='border-b mb-4 pb-4 flex items-center'>
      <h2 className='font-medium text-lg flex-1'>
        {title}
      </h2>

      {renderRight && <div>{renderRight()}</div>}
    </div>
  )
}
