import { Button, Col, Drawer, Form, Input, Row } from 'antd'
import React from 'react'

// create form skill with Drawer of ant design (vertical layout):
// - nameSkill (string)
// - level (string)
// - idManager (Select)

export const FormSkill = ({ onClose, visible, isSubmitting, onSubmit }) => {
  return (
    <Drawer title='Create a new skill' width={720} onClose={onClose} open={visible} bodyStyle={{ paddingBottom: 80 }}>
      <Form layout='vertical' onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='nameSkill'
              label='Name Skill'
              rules={[{ required: true, message: 'Please enter skill name' }]}
            >
              <Input placeholder='Please enter skill name' />
            </Form.Item>
          </Col>
          <Col span={12}>

            <Form.Item
              name='level'
              label='Level'
              rules={[{ required: true, message: 'Please enter level' }]}
            >
              <Input placeholder='Please enter level' />
            </Form.Item>
          </Col>
        </Row>

        <Button type='primary' htmlType='submit' loading={isSubmitting}>Create</Button>
      </Form>
    </Drawer>
  )
}
