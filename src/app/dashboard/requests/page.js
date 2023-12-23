'use client'

import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Typography, Button, Row, Col, Form, Modal, Upload } from 'antd'
import React from 'react'

const { confirm } = Modal
const { Title } = Typography

const data = [
  {
    query: 'Lorem ipsum',
    answer: 'Dolor set amet',
    status: 'processing',
  },
  {
    query: 'Lorem ipsum',
    answer: 'Dolor set amet',
    status: 'resolved',
  },
  {
    query: 'Lorem ipsum',
    answer: 'Dolor set amet',
    status: 'processing',
  },
  {
    query: 'Lorem ipsum',
    answer: 'Dolor set amet',
    status: 'processing',
  },
]

const ServiceRequests = () => {
  const [form] = Form.useForm()
  const currYear = new Date().getFullYear() - 2

  const submitHandler = (values) => {
    console.log(values)
  }

  return (
    <>
      <Row className="mb-3">
        <Title level={3}>Create Service Request</Title>
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

export default ServiceRequests
