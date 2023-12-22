'use client'

import React from 'react'
import { Typography, Input, Form, Row, Col, Button } from 'antd'
import { useRouter } from 'next/navigation'
import { signIn } from '@/services/auth'

const { Title } = Typography

const App = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const submitHandler = async (values) => {
    const res = await signIn(values)
    const { jwt } = res
    localStorage.setItem('token', jwt)
    router.push('/dashboard/returns')
  }

  return (
    <>
      <Row className="mb-3">
        <Title level={3}>Welcome to Gilda & Company</Title>
      </Row>
      <Form layout={'vertical'} form={form} onFinish={submitHandler}>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="identifier"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="mt-4" span={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </>
  )
}

export default App
