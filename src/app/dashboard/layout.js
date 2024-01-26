"use client";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {
  theme,
  Menu,
  Button,
  Badge,
  Layout,
  Dropdown,
  Typography,
  Spin,
} from "antd";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { NAV_ITEMS } from "@/utils/constants";
import { useAuthContext } from "@/context/AuthContext";

const { Title } = Typography;

const { Header, Content, Sider } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const { isLoading, signOut } = useAuthContext();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  const defaultSelectedKeys = NAV_ITEMS.findIndex(
    (item) => item.path === path
  );

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
            <Badge count={5}>
              <Button
                type="text"
                icon={<BellOutlined className="text-lg" color="#000" />}
              />
            </Badge>
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
              <Button
                type="text"
                icon={<UserOutlined className="text-lg" />}
              />
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
