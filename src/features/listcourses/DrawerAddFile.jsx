import { Button, Drawer, Form, Input } from 'antd'
import React from 'react'

export const DrawerAddFile = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Drawer title='Add File' placement='right' onClose={onClose} open={isOpen}>
      <Form
        name='add-file'
        layout='vertical'
        onFinish={onSubmit}
      >
        <Form.Item
          label='File URL'
          name='link'
        >
          <Input placeholder='File URL (Example: Google Drive Link)' />
        </Form.Item>

        <Button type='primary' htmlType='submit'>
          Add
        </Button>
      </Form>
    </Drawer>
  )
}
