'use client'

import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Typography, Button, Row, Col, Select, Form, Modal, Upload } from 'antd'
import React from 'react'

const { confirm } = Modal
const { Title } = Typography

const Refunds = () => {
  const [form] = Form.useForm()

  const currYear = new Date().getFullYear()

  const yearList = [
    { value: currYear, label: currYear },
    { value: currYear - 1, label: currYear - 1 },
    { value: currYear - 2, label: currYear - 2 },
  ]

  const submitHandler = (values) => {
    console.log(values)
  }

  return (
    <>
      <Row className="mb-3">
        <Title level={3}>Refunds Filing</Title>
      </Row>
      <Form
        layout={'vertical'}
        form={form}
        onFinish={(values) =>
          confirm({
            icon: <ExclamationCircleOutlined />,
            title: 'Do you want to proceed?',
            content:
              'Please press Ok to continue or Cancel to confirm all the details before submitting.',
            onOk() {
              submitHandler(values)
            },
            onCancel() {},
          })
        }
        // initialValues={{ layout: formLayout }}
        // style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Year"
              name="year"
              rules={[{ required: true, message: 'Please select a year!' }]}
            >
              <Select
                style={{
                  width: 150,
                }}
                options={yearList}
              />
            </Form.Item>
          </Col>
          <Col className="mt-4" span={24}>
            <Form.Item
              label="Upload documents"
              name="files"
              rules={[{ required: true, message: 'Please upload a file!' }]}
            >
              <Upload
                maxCount={1}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                beforeUpload={() => false}
                progress={{
                  strokeColor: {
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  },
                  strokeWidth: 3,
                  format: (percent) =>
                    percent && `${parseFloat(percent.toFixed(2))}%`,
                }}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
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

export default Refunds
