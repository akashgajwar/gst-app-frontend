"use client";

import { Alert, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

// import { PHONE_REGEX } from '@/utils/constants'
import { useMutation } from "react-query";

import { generateOTP, confirmOTP } from "@/services/auth";

import styles from "./style.module.css";
const { Title } = Typography;

const OTPLogin = () => {
  const [otpScreen, setOTPScreen] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const [form] = Form.useForm();
  const router = useRouter();

  const { mutate: genOTP, isLoading: generatingOTP } = useMutation({
    mutationKey: "generateOTP",
    mutationFn: (values) => generateOTP(values),
    onSuccess: () => {
      setPhone(form.getFieldValue("phone"));
      setOTPScreen(true);
    },
    onError: (err) => setError(err.response.data.error.message),
  });

  const { mutate: verifyOTP, isLoading: verifyingOTP } = useMutation({
    mutationKey: "verifyOTP",
    mutationFn: (values) => confirmOTP(values),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/dashboard/returns");
    },
    onError: (err) => setError(err.response.data.error.message),
  });

  const submitHandler = (values) => {
    const mutationFn = otpScreen ? verifyOTP : genOTP;
    mutationFn({ phone, ...values });
  };

  const isLoading = generatingOTP || verifyingOTP;

  console.log(error);

  return (
    <Card className={`shadow ${styles.modal}`}>
      <Row>
        <Title level={3} className="mx-auto">
          Login using OTP
        </Title>
      </Row>
      <Row className="mb-2">
        {error && (
          <Alert
            className="w-100"
            message={error?.replace("identifier", "email")}
            type="error"
            showIcon
          />
        )}
      </Row>
      <Form layout={"vertical"} form={form} onFinish={submitHandler}>
        {otpScreen ? (
          <Row>
            <Col span={24}>
              <Form.Item
                label="Enter your OTP"
                name="otp"
                rules={[{ required: true, message: "Please enter the otp." }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col span={24}>
              <Form.Item
                label="Phone (without country code)"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone." },
                  // {
                  //   pattern: PHONE_REGEX,
                  //   message: 'Please enter valid phone!',
                  // },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row justify={"space-between"} align={"middle"}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Row>
      </Form>
    </Card>
  );
};

export default OTPLogin;
