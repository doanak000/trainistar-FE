import { Button, Col, List, Modal, notification, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { courseApi } from '../../../api'
import { Avatar } from '../../../components/avatar'
import { LoadingFullscreen } from '../../../components/loading-fullscreen'
import { CourseItem } from '../courses/course-item'
import { selectCurrentUser } from '../../auth/authSlice'

const data = [
  {
    title: 'Algorithm Efficiency',
    desc: ''
  },
  {
    title: 'Sorting Algorithms',
    desc: 'Selection Sort, Heap Sort, Quick Sort, Merge Sort, Radix Sort'
  },
  {
    title: 'Tree structures',
    desc: 'General tree, Binary tree, Binary search tree, Balanced tree'
  },
  {
    title: 'Hash table',
    desc: ''
  },
  {
    title: 'Graph structure',
    desc: 'Traversal, Spanning tree/Minimum Spanning tree, Shortest Path'
  }
]

export const CourseDetails = () => {
  const { id: courseId } = useParams()

  const [course, setCourse] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [isJoining, setIsJoining] = useState(false)

  const currentUser = useSelector(selectCurrentUser)

  const fetchCourse = async (courseId) => {
    setIsFetching(true)

    const { success, data } = await courseApi.getCourseById(courseId)

    if (!success) {
      setIsFetching(false)
      return
    }

    setCourse(data?.[0] ?? null)
    setIsFetching(false)
  }

  const handleJoinCourse = async () => {
    try {
      setIsJoining(true)

      const { success } = await courseApi.joinCourse({ courseId, studentId: currentUser.id })

      if (!success) {
        throw new Error('Failed to join this course')
      }

      notification.success({
        message: 'You\'ve joined this course'
      })
    } catch (error) {
      notification.error({
        message: error.message
      })
    } finally {
      setIsJoining(false)
    }
  }

  const handleJoinClick = () => {
    Modal.confirm({
      type: 'confirm',
      content: 'Are you sure you want to join this course?',
      centered: true,
      onOk: handleJoinCourse
    })
  }

  useEffect(() => {
    fetchCourse(courseId)
  }, [courseId])

  if (isFetching) {
    return (
      <LoadingFullscreen />
    )
  }

  return (
    <div className='-mt-4'>
      <Row>
        <Col span={12} offset={6}>
          <div className='space-y-4'>
            <CourseItem course={course} isViewDetails />

            <div className='space-y-2'>
              <div className='font-semibold text-base'>Course Outline</div>
              <div className='bg-white border rounded-md shadow-sm'>
                <List
                  itemLayout='horizontal'
                  dataSource={data}
                  size='small'
                  style={{ border: 0 }}
                  bordered
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<strong><strong className='text-primary-500'>Week {index + 1}:</strong> {item.title}</strong>}
                        description={<p className='text-gray-500'>{item.desc || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}</p>}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div className='font-semibold text-base'>Ratings</div>
              <div className='bg-white border rounded-md shadow-sm'>
                <List
                  itemLayout='horizontal'
                  dataSource={data}
                  size='small'
                  style={{ border: 0 }}
                  bordered
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar size={32} fullName='fullName' />}
                        title={<strong>fullName</strong>}
                        description={<p className='text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>

            <div className='sticky bottom-0'>
              <Button size='large' type='primary' block loading={isJoining} onClick={handleJoinClick}>Join this Course</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
