import React, { useEffect, useState } from 'react'
import ListCourses from '../features/listcourses/ListCourses'
import { courseApi, sampleApi, userApi } from '../api'
import { Spin,notification, Button, Form, Input, Drawer, Select } from 'antd'
import { NOTIFICATION_TYPE } from '../constants/common'
import { Notification } from '../components/Notification/Notification'
const Context = React.createContext({
  name: 'Default'
})

const ListCoursePage = () => {
  const [listCourses, setListCourses] = useState(null)
  const [isFetching, setIsFetching] = useState(true) // Init Loading State
  const [optionTeacher,setOptionTeacher] = useState(null)
  const [openDrawerCreateCourse, setOpenDrawerCreateCourse] = useState(false)
  const [listManageCourses,setListManageCourses] = useState(null)
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
  const fetchData = async () => {
    try {
      const { success, data } = await courseApi.getListCourseApi()
      if (!success) {
        throw new Error(data)
      }
      // Handle Success
      console.log('Success', data)
      setListCourses(data)

    } catch (error) {
      // Handle Error
      console.error('Error', error?.message)
    } finally {
      setIsFetching(false)
    }
  }

  const deleteCourse = async (record) =>{
    try {
      const { success, data } = await courseApi.deleteCourseById(record.idCourse)
      if (!success) {
        throw new Error(data)
      }
       data.code === '-1' &&  Notification({
            type: NOTIFICATION_TYPE.ERROR,
            message: 'Courses having student. Can not delete'
          })
      fetchData()
    } catch (error) {
      // Handle Error
      console.error('Error', error?.message)
    } finally {
      setIsFetching(false)
    }
  }

  const updateCourseById = async (idCourse, dataBody) =>{
    try {
      const { success, data } = await courseApi.updateCourseById(idCourse,dataBody)
      if (!success) {
        throw new Error(data)
      }
      Notification({
            type: NOTIFICATION_TYPE.INFO,
            message: data?.message
          })
      fetchData()
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
      setOptionTeacher(data.filter(item=>item.typeUser === 2).map(({
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
  const onFinishDrawerCreateCourse =async (values) => {
    console.log('SuccessCreateCourse:', values)
    const { success, data } = await courseApi.createCourse(values)
    fetchData()
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
    fetchData()
    fetchListTeacher()
    fetchTotalStudentByTime('month')
  }, [])

  return (
    <div>
      <h1>ListCoursePage</h1>
      <Button onClick={showDrawerCreateCourse}>Create new course</Button>
      <div>
        {isFetching ? <Spin /> : <ListCourses listCourses={listCourses} deleteCourse={deleteCourse} 
        updateCourseById={updateCourseById} optionTeacher={optionTeacher} 
        fetchTotalStudentByTime={fetchTotalStudentByTime} listManageCourses={listManageCourses}/>}
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
