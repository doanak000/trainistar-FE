import { Col, Input, Row, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import _, { debounce } from 'lodash'
import React, { useCallback, useState } from 'react'
import { courseApi } from '../../../api'
import { CourseItem } from '../courses/course-item'

export const StudentSearch = () => {
  const [keyword, setKeyword] = useState('')

  const [resultKeyword, setResultKeyword] = useState('')
  const [result, setResult] = useState([])

  const hasResult = Array.isArray(result) && result?.length > 0

  const searchCourses = async (keyword) => {
    const { success, data } = await courseApi.search(keyword)

    setResultKeyword(keyword)

    if (!success) {
      setResult([])
      return
    }

    setResult(_.isArray(data) ? data : [])
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce((keyword) => searchCourses(keyword), 250), [])

  const handleInputChange = (e) => {
    const { value } = e.target
    setKeyword(value)
    debounceSearch(value)
  }

  return (
    <div className='space-y-4'>
      <div className='space-y-4 bg-white border shadow-sm rounded-md px-4 py-8'>
        <Row>
          <Col span={12} offset={6}>
            <div>
              <h4 className='font-semibold text-xl text-center leading-none mb-4'><span className='text-primary-500'>Search</span> Courses</h4>

              <Input.Search
                placeholder='Search courses ...'
                allowClear
                enterButton={<div><SearchOutlined /></div>}
                size='large'
                value={keyword}
                onChange={handleInputChange}
                onSearch={searchCourses}
              />

              <div className='mt-4 flex items-center'>
                <span className='mr-2'>Discover</span>

                {['Lap trinh iOS', 'He dieu hanh', 'python', 'java', 'data science'].map((keyword) => {
                  return (
                    <Tag
                      key={keyword}
                      className='cursor-pointer'
                      onClick={() => {
                        setKeyword(keyword)
                        searchCourses(keyword)
                      }}
                    >
                      {keyword}
                    </Tag>
                  )
                })}</div>
            </div>
          </Col>
        </Row>
      </div>

      {resultKeyword ? (
        <div className='space-y-4'>
          <div>Search result for <strong className='text-primary-500'>{`\`${resultKeyword}\``}</strong> <span className='text-gray-500'>({result.length} results)</span></div>

          {hasResult ? (
            <Row gutter={[16, 16]}>
              {result.map((course) => {
                return (
                  <Col key={course.idCourse} span={8}>
                    <CourseItem course={course} />
                  </Col>
                )
              })}
            </Row>
          ) : (
            <div className='flex flex-col items-center justify-center space-y-4'>
              <img src='/images/illustrations/reading.png' className='w-72' />
              <div className='text-center'>
                <div className='font-semibold text-lg'>No results found</div>
                <div className='text-gray-500'>Try different or more general keywords</div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='flex justify-center p-4'>
          <img src='/images/illustrations/reading.png' className='w-72' />
        </div>
      )}
    </div>
  )
}
