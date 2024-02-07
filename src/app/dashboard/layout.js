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
  Badge,
  Button,
  Layout,
  Dropdown,
  Typography,
  Spin,
  Space,
  Alert,
  Modal,
} from "antd";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/utils/constants";
import { useAuthContext } from "@/context/AuthContext";
import {
  getNotifications,
  updateNotification,
} from "@/services/notifications";
import { QueryClientProvider, useMutation, useQuery, useQueryClient } from "react-query";
import { getTimeAgo } from "@/utils/helpers";

const { Title } = Typography;

const { Header, Content, Sider } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const queryClient = useQueryClient()

  const { isLoading, signOut, user } = useAuthContext();

  const {
    isLoading: loadingNotifications,
    error,
    data: notifications,
  } = useQuery({
    queryFn: () => getNotifications(user.id),
    queryKey: "notifications",
    enabled: Boolean(user?.id),
  });

  const { mutate, isLoading: updatingNotification } = useMutation({
    mutationFn: updateNotification,
    mutationKey: 'notifications',
    onSuccess: () => {
      queryClient.invalidateQueries('notifications')
    }
  })

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    mutate(id)
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const notificationsMenuContent = notifications?.map(({ id, type, content, createdAt }) => ({
    label: (
      <div key={id}>
        <Space
          size="large"
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Button size="small" type="primary">
            {type}
          </Button>
          {`${content}`}
          {`${getTimeAgo(createdAt)}`}
        </Space>
      </div>
    ),
    key: id.toString(),
  }));

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
  }, [router]);

  useEffect(() => {
    if (notifications?.length) showModal();
  }, [notifications]);

  if (isLoading || loadingNotifications) {
    return <Spin size="large" />;
  }

  const defaultSelectedKeys = NAV_ITEMS.findIndex(
    (item) => item.path === path
  );

  const count = notificationsMenuContent?.length
  const paymentNotifications = notifications?.find(({ type }) => type === 'PAYMENT')

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
        {paymentNotifications && (
          <div key={paymentNotifications[0]?.id}>
            <Alert
              message={paymentNotifications[0]?.type}
              description={paymentNotifications[0]?.content}
              type="error"
              showIcon
            />
          </div>
        )}
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
            <Dropdown menu={{ items: notificationsMenuContent }} trigger={["hover"]}>
              <Badge count={count}>
                <Button
                  type="text"
                  icon={<BellOutlined className="text-lg" />}
                />
              </Badge>
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
        <Modal
          open={open}
          onOk={() => handleOk()}
          okText="Mark As Read"
          confirmLoading={updatingNotification}
          onCancel={handleCancel}
        />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
