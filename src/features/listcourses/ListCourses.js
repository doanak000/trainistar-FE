import { Button, Drawer, Form, Input, Select, Space, Table, Tag } from 'antd'
import React, { useState } from 'react'


const ListCourses = ({listCourses,deleteCourse,updateCourseById,optionTeacher}) => {
   const [open, setOpen] = useState(false)
   const [currentCourseDrawer,setCurrentCouseDrawer] = useState(null)
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
        <a>Xem đánh giá</a>
      </Space>
    )
  }
]

return (
  <>
       <Table columns={columns} dataSource={listCourses} />
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
 
