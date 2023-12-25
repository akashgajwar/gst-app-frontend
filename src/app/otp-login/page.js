'use client'

import { Alert, Typography, Input, Form, Row, Col, Button, Card } from 'antd'
import React, { useState } from 'react'

import { PHONE_REGEX } from '@/utils/constants'

const { Title } = Typography

const OTPLogin = () => {
  const [error, setError] = useState(undefined)
  const { form } = Form.useForm()

  const submitHandler = () => {}

  return (
    <Card className="shadow w-25">
      <Row>
        <Title level={3} className="mx-auto">
          Login using OTP
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
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: 'Please enter your phone.' },
                {
                  pattern: PHONE_REGEX,
                  message: 'Please enter valid phone!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'} align={'middle'}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </Card>
  )
}

export default OTPLogin
