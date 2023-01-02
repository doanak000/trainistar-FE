import { Button, Drawer, Form, Input, Radio, Select, Space, Table, Tag } from 'antd'
import React, { useState , useEffect } from 'react'

import { courseApi } from '../../api'

const ListCourses = ({listCourses,deleteCourse,updateCourseById,optionTeacher}) => {
   const [open, setOpen] = useState(false)
   const [currentCourseDrawer,setCurrentCouseDrawer] = useState(null)
   const [typeManage,setTypeManage] = useState('month')
   const [listManageCourses,setListManageCourses] = useState(null)
  const showDrawer = (record) => {
    setCurrentCouseDrawer(record)
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onFinish = (values) => {
    updateCourseById(currentCourseDrawer?.idCourse,values)
    console.log('Success:', values)
        setOpen(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
        setOpen(false)
  }

  const handleChangeTypeManage =  (e) => {
    setTypeManage(e.target.value)
    fetchTotalStudentByTime(e.target.value)
  }

  const fetchTotalStudentByTime = async (time) => {
    const { success, data } = await courseApi.getTotalStudentByTime(time)
      if (!success) {
        throw new Error(data)
      }
      setListManageCourses(data)
  }

  const columns = [
  {
    title: 'Courses',
    dataIndex: 'nameCourse',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Teacher',
    dataIndex: 'teacherName',
    key: 'teacher',
     render: (text) => <a>{text}</a>
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
     render: (text) => <a>{text}</a>
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <Button onClick={()=>showDrawer(record)}>Edit</Button>
        <Button onClick={()=>{deleteCourse(record)}}>Delete</Button>
      </Space>
    )
  }
]
  const columnsManage = [
  {
    title: 'Courses',
    dataIndex: 'nameCourse',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Total Students',
    dataIndex: 'TotalStudents',
    key: 'TotalStudents',
     render: (text) => <a>{text}</a>
  },
  {
    title: 'Month',
    dataIndex: 'Month',
    key: 'Month',
     render: (text) => <a>{text}</a>
  }
]
  useEffect(
    fetchTotalStudentByTime(typeManage)
  ,[])

return (
  <>
       <Table columns={columns} dataSource={listCourses}></Table>
       <div style={{paddingTop: '20px'}}>
          <Radio.Group value={typeManage} onChange={handleChangeTypeManage}>
            <Radio.Button value='month'>Month</Radio.Button>
            <Radio.Button value='quarter'>Quarter</Radio.Button>
            <Radio.Button value='year'>Year</Radio.Button>
          </Radio.Group>
          <Table columns={columnsManage} dataSource={listManageCourses}></Table>
       </div>

        <Drawer title='Update Courses' placement='right' onClose={onClose} open={open}>
           <Form
              name='basic'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.Item
                label='Course'
                name='nameCourse'
                initialValue={currentCourseDrawer?.nameCourse}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Teacher'
                name='idTeacher'
                initialValue={currentCourseDrawer?.idTeacher}
              >
                <Select options={optionTeacher} />
              </Form.Item>

              <Form.Item
                label='Description'
                name='description'
                initialValue={currentCourseDrawer?.description}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </Form.Item>
            </Form>
        </Drawer>
  </>
)

}
 export default ListCourses
 
