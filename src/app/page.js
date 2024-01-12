"use client";

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
} from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { EMAIL_REGEX } from "@/utils/constants";
import { useAuthContext } from "@/context/AuthContext";

const { Title } = Typography;

const App = () => {
  const [form] = Form.useForm();
  const { isLoading, error, setError, mutate, meLoading } = useAuthContext();

  const submitHandler = async (values) => {
    mutate(values);
  };

  if (meLoading) {
    return <Spin size="large" />;
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
            message={error?.message.replace("identifier", "email")}
            type="error"
            showIcon
          />
        )}
      </Row>
      <Form
        layout={"vertical"}
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
                { required: true, message: "Please enter your email." },
                {
                  pattern: EMAIL_REGEX,
                  message: "Please enter valid email.",
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
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"space-between"} align={"middle"}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
          <Link href={"/otp-login"}>Login via OTP?</Link>
        </Row>
      </Form>
    </Card>
  );
};

export default App;
