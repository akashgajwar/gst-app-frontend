'use client'

// import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Typography, Button, Row, Col, Space, Table, Modal } from 'antd'
import React, { useState } from 'react';
const { Title } = Typography;
const columns = [

  {
    title: 'Query',
    dataIndex: 'query',
    key: 'query',
    render: (text) => <a>{text}</a>,
  },

  {
    title: 'Answer',
    dataIndex: 'answer',
    key: 'answer',
    render: (text) => <a>{text}</a>,
  },

  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">

        <a>Edit</a>
      </Space>
    ),
  },
];
const data = [
  {
    query: 'I am not able to subit my PDF',
    answer: 'Please upload the fresh documents again',
    action: [],
  },
  {
    query: 'I am not able to subit my PDF',
    answer: 'Please upload the fresh documents again',
    action: [],
  },
  {
    query: 'I am not able to subit my PDF',
    answer: 'Please upload the fresh documents again',
    action: [],
  },
];


const ServiceRequests = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(inputValue);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Row className="mb-3">
        <div>
          <Title level={3}>Service Request</Title>
          <Button type="primary" onClick={showModal}>
            Open request
          </Button>
        </div>

        <Modal title="Create request" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <div >
            <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} class="w-100 p-3" />
          </div>
        </Modal>
      </Row>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>


    </>
  )
}

export default ServiceRequests
