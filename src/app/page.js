'use client'

import {
  Alert,
  Typography,
  Input,
  Form,
  Row,
  Col,
  Button,
  Card,
  Spin,
} from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import React, { useState } from 'react'

import { getUser, signIn } from '@/services/auth'
import { EMAIL_REGEX } from '@/utils/constants'

const { Title } = Typography

const App = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const { isLoading: meLoading } = useQuery({
    queryKey: 'me',
    queryFn: getUser,
    onSuccess: () => router.push('/dashboard/returns'),
    retry: 1,
  })

  const submitHandler = async (values) => {
    try {
      setIsLoading(true)
      setError(undefined)
      const res = await signIn(values)
      const { jwt } = res
      localStorage.setItem('token', jwt)
      router.push('/dashboard/returns')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.response.data.error)
    }
  }

  if (meLoading) {
    return <Spin size="large" />
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
          <Link href={'/otp-login'}>Login via OTP?</Link>
        </Row>
      </Form>
    </Card>
  )
}

export default App
