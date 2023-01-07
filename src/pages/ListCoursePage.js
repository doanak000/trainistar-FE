import { Button, Drawer, Form, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { courseApi, userApi } from '../api'
import { Notification } from '../components/Notification/Notification'
import { PageTitle } from '../components/page-title'
import { NOTIFICATION_TYPE } from '../constants/common'
import ListCourses from '../features/listcourses/ListCourses'
import { LoadingFullscreen } from '../components/loading-fullscreen'
import { useCoursesData } from '../features/listcourses/hook'

const ListCoursePage = () => {
  const [isFetching, setIsFetching] = useState(true) // Init Loading State
  const [optionTeacher, setOptionTeacher] = useState(null)
  const [openDrawerCreateCourse, setOpenDrawerCreateCourse] = useState(false)
  const [listManageCourses, setListManageCourses] = useState(null)

  const coursesData = useCoursesData()

  const showDrawerCreateCourse = () => {
    setOpenDrawerCreateCourse(true)
  }
  const onCloseDrawerCreateCourse = () => {
    setOpenDrawerCreateCourse(false)
  }

  const onFinishFailedDrawerCreateCourse = (errorInfo) => {
    console.log('Failed:', errorInfo)
    setOpenDrawerCreateCourse(false)
  }
  // const fetchData = async () => {
  //   try {
  //     const { success, data } = await courseApi.getListCourseApi()
  //     if (!success) {
  //       throw new Error(data)
  //     }
  //     // Handle Success
  //     console.log('Success', data)
  //     setListCourses(data)

  //   } catch (error) {
  //     // Handle Error
  //     console.error('Error', error?.message)
  //   } finally {
  //     setIsFetching(false)
  //   }
  // }

  const deleteCourse = async (record) => {
    try {
      const { success, data } = await courseApi.deleteCourseById(record.idCourse)
      if (!success) {
        throw new Error(data)
      }
      data.code === '-1' && Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: 'Courses having student. Can not delete'
      })
      coursesData.getCourses()
    } catch (error) {
      // Handle Error
      console.error('Error', error?.message)
    } finally {
      setIsFetching(false)
    }
  }

  const updateCourseById = async (idCourse, dataBody) => {
    try {
      const { success, data } = await courseApi.updateCourseById(idCourse, dataBody)
      if (!success) {
        throw new Error(data)
      }
      Notification({
        type: NOTIFICATION_TYPE.INFO,
        message: data?.message
      })
      coursesData.getCourses()
    } catch (error) {
      // Handle Error
      console.error('Error', error?.message)
    } finally {
      setIsFetching(false)
    }
  }
  const fetchListTeacher = async () => {
    try {
      const { success, data } = await userApi.getAllUserApi()

      if (!success) {
        throw new Error(data)
      }

      // Handle Success
      setOptionTeacher(data.filter(item => item.typeUser === 2).map(({
        idUser: value,
        userName: label,
        ...rest
      }) => ({
        value,
        label,
        ...rest
      }))
      )

    } catch (error) {
      // Handle Error
      console.error('Error', error?.message)
    } finally {
      setIsFetching(false)
    }
  }
  const onFinishDrawerCreateCourse = async (values) => {
    console.log('SuccessCreateCourse:', values)
    await courseApi.createCourse(values)
    coursesData.getCourses()
    setOpenDrawerCreateCourse(false)
  }

  const fetchTotalStudentByTime = async (time) => {
    try {
      const { success, data } = await courseApi.getTotalStudentByTime(time)
      if (!success) {
        throw new Error(data)
      }
      setListManageCourses(data)
    } catch (error) {
      // Handle Error
      console.error('Error', error?.message)
    }
  }
  useEffect(() => {
    coursesData.getCourses()
    fetchListTeacher()
    fetchTotalStudentByTime('month')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <PageTitle title='Manage Courses' renderRight={() => {
        return <Button type='primary' onClick={showDrawerCreateCourse}>Create Course</Button>
      }} />

      <div>
        {isFetching ? <LoadingFullscreen /> : <ListCourses listCourses={coursesData.courses} deleteCourse={deleteCourse}
          updateCourseById={updateCourseById} optionTeacher={optionTeacher}
          fetchTotalStudentByTime={fetchTotalStudentByTime} listManageCourses={listManageCourses} />}
      </div>
      <Drawer title='Create Courses' placement='right' onClose={onCloseDrawerCreateCourse} open={openDrawerCreateCourse}>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinishDrawerCreateCourse}
          onFinishFailed={onFinishFailedDrawerCreateCourse}
          autoComplete='off'
        >
          <Form.Item
            label='Course'
            name='nameCourse'
            required
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Teacher'
            name='idTeacher'
            required
            rules={[{ required: true }]}
          >
            <Select options={optionTeacher}></Select>
          </Form.Item>
          <Form.Item
            label='Description'
            name='description'
            required
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button onClick={onCloseDrawerCreateCourse}>Cancel</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default ListCoursePage
