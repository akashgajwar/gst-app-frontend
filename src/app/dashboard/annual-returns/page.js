"use client";

import { UploadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Input,
  Typography,
  Button,
  Row,
  Col,
  Select,
  Form,
  Modal,
  Upload,
} from "antd";
import React from "react";

const { confirm } = Modal;
const { Title } = Typography;

const AnnualReturns = () => {
  const [form] = Form.useForm();
  const currYear = new Date().getFullYear() - 2;

  const gstTypes = [
    { value: "GSTR-9", label: "GSTR-9" },
    { value: "GSTR-9C" - 1, label: "GSTR-9C" },
  ];

  const yearsList = Array.from({ length: 4 }, (_, index) => ({
    value: currYear + index,
    label: `${currYear + index}-${(currYear + index + 1)
      .toString()
      .slice(-2)}`,
  }));

  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <>
      <Row className="mb-3">
        <Title level={3}>Annual Returns</Title>
      </Row>
      <Form
        layout={"vertical"}
        form={form}
        onFinish={(values) =>
          confirm({
            icon: <ExclamationCircleOutlined />,
            title: "Do you want to proceed?",
            content:
              "Please press Ok to continue or Cancel to confirm all the details before submitting.",
            onOk() {
              submitHandler(values);
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
              label="GST Type"
              name="type"
              rules={[{ required: true, message: "Please select a type!" }]}
            >
              <Select
                style={{
                  width: 150,
                }}
                options={gstTypes}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Financial Year"
              name="financialYear"
              rules={[
                { required: true, message: "Please select a financial year!" },
              ]}
            >
              <Select
                style={{
                  width: 150,
                }}
                options={yearsList}
              />
            </Form.Item>
          </Col>
          <Col className="mt-4" span={24}>
            <Form.Item
              label="Upload documents"
              name="files"
              rules={[{ required: true, message: "Please upload a file!" }]}
            >
              <Upload
                maxCount={1}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                beforeUpload={() => false}
                progress={{
                  strokeColor: {
                    "0%": "#108ee9",
                    "100%": "#87d068",
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
          <Col className="mt-4" span={24}>
            <Form.Item label="Note" name="note">
              <Input.TextArea className="w-50" />
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
  );
};

export default AnnualReturns;
