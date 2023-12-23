'use client'

import { Alert, Typography, Input, Form, Row, Col, Button, Card } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { signIn } from '@/services/auth'
import { EMAIL_REGEX } from '@/utils/constants'

const { Title } = Typography

const App = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(undefined)

  const submitHandler = async (values) => {
    try {
      setIsLoading(true)
      setError(undefined)
      const res = await signIn(values)
      const { jwt } = res
      localStorage.setItem('token', jwt)
      setIsLoading(false)
      router.push('/dashboard/returns')
    } catch (error) {
      setIsLoading(false)
      setError(error.response.data.error)
    }
  }

  return (
    <Card className="shadow">
      <Row className="mb-3">
        <Title level={3} className="mx-auto">
          Welcome to Gilda & Company
        </Title>
      </Row>
      <Row className="mb-2">
        {error && (
          <Alert
            className="w-100"
            message={error?.message.replace('identifier', 'email')}
            type="error"
            showIcon
          />
        )}
      </Row>
      <Form
        layout={'vertical'}
        form={form}
        onFinish={submitHandler}
        onChange={() => setError(undefined)}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="identifier"
              rules={[
                { required: true, message: 'Please enter your email.' },
                {
                  pattern: EMAIL_REGEX,
                  message: 'Please enter valid email.',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'} align={'middle'}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
          <Link href={'/forgot'}>Forgot your password?</Link>
        </Row>
      </Form>
    </Card>
  )
}

export default App
