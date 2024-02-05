"use client";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {
  theme,
  Menu,
  Button,
  Layout,
  Dropdown,
  Typography,
  Spin,
  Space,
  Alert,
  Modal,
  ConfigProvider,
} from "antd";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/utils/constants";
import { useAuthContext } from "@/context/AuthContext";
import { notifications, updateNotification } from "@/services/notifications";
import { useQuery } from "react-query";
import moment from "moment";

const { Title } = Typography;

const { Header, Content, Sider } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const { isLoading, signOut, user } = useAuthContext();

  console.log(user);

  const {
    isLoading: loadingNotifications,
    error,
    data,
  } = useQuery({
    queryFn: notifications,
    queryKey: "notifications",
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const getTimeAgo = (createdAt) => {
    const now = moment();
    const createdDate = moment(createdAt);
    const minutesAgo = now.diff(createdDate, "minutes");
    const hoursAgo = now.diff(createdDate, "hours");
    const daysAgo = now.diff(createdDate, "days");

    if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`;
    } else {
      return `${daysAgo} days ago`;
    }
  };

  const items =
    data &&
    data.map((a) => ({
      label: (
        <div key={a.id}>
          <Space
            size="large"
            direction="horizontal"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <Button size="small" type="primary">
              {a.type}
            </Button>
            {`${a.content}`}
            {`${getTimeAgo(a.createdAt)}`}
          </Space>
        </div>
      ),
      key: a.id.toString(),
    }));

  const modalContent =
    data &&
    data.slice(0, 1).map((a) => (
      <div key={a.id}>
        <Space
          size="large"
          direction="vertical"
          title={a.type}
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Button
            size="small"
            type="primary"
            onClick={() => handleButtonClick(a.type)}
          >
            {a.type}
          </Button>
          <p>{`${a.content} | ${getTimeAgo(a.createdAt)}`}</p>
        </Space>
      </div>
    ));

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    showModal();

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  const defaultSelectedKeys = NAV_ITEMS.findIndex((item) => item.path === path);

  return (
    <Layout
      className="w-100"
      style={{
        height: "100vh",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="pt-5"
        width={250}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKeys.toString()]}
          items={NAV_ITEMS.map(({ label, path }, index) => ({
            key: index,
            label,
            onClick: () => router.push(path),
          }))}
        />
      </Sider>
      <Layout>
        <ConfigProvider
          theme={{
            components: {
              Alert: {
                withDescriptionIconSize: 25,
                withDescriptionPadding: "10px 32px",
              },
            },
          }}
        >
          {data && data.reverse().find((a) => a.type === "PAYMENT") && (
            <div key={data[0].id}>
              <Alert
                message={data[0].type}
                description={data[0].content}
                type="warning"
                showIcon
                closable
              />
            </div>
          )}
        </ConfigProvider>
        <Header
          className="d-flex justify-content-between px-3"
          style={{
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <span className="pr-4">
            {/* <Button
                      onClick={() => setDarkModeEnabled((state) => !state)}
                    >
                      Change Theme {darkModeEnabled ? 'Dark' : 'Light'}
                    </Button> */}
            <Modal
              title="Title"
              open={open}
              onOk={handleOk}
              okText="Mark As Read"
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              {modalContent}
            </Modal>
            <Dropdown menu={{ items }} trigger={["hover"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <BellOutlined className="text-lg" />
                </Space>
              </a>
            </Dropdown>
            <Dropdown
              menu={{
                items: [
                  {
                    label: <Title level={5}>Profile</Title>,
                    key: "1",
                    onClick: () => alert("Profile"),
                  },
                  {
                    label: <Title level={5}>Logout</Title>,
                    key: "2",
                    onClick: signOut,
                  },
                ],
              }}
            >
              <Button type="text" icon={<UserOutlined className="text-lg" />} />
            </Dropdown>
          </span>
        </Header>

        <Content
          className="shadow m-4 p-4"
          style={{
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
