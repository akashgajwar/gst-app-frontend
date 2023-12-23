'use client'

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons'
import {
  theme,
  Menu,
  Button,
  Badge,
  Layout,
  Skeleton,
  Dropdown,
  Typography,
} from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { getUser } from '@/services/auth'

const { Title } = Typography

const { Header, Content, Sider } = Layout

const DashboardLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const router = useRouter()

  const signOut = () => {
    localStorage.setItem('token', undefined)
    router.push('/')
  }

  useEffect(() => {
    async function me() {
      const user = await getUser()
      if (!user) {
        router.push('/')
        return
      }

      setIsLoading(false)
    }
    me()
  }, [])

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <Layout
      style={{
        height: '100vh',
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
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Return Filing',
              onClick: () => router.push('/dashboard/returns'),
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Annual Return',
              onClick: () => router.push('/dashboard/annual-returns'),
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Refunds',
              onClick: () => router.push('/dashboard/refunds'),
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: 'Amendments',
              onClick: () => router.push('/dashboard/amendments'),
            },
            {
              key: '5',
              icon: <UploadOutlined />,
              label: 'Other Filings',
              onClick: () => router.push('/dashboard/other'),
            },
            {
              key: '6',
              icon: <UploadOutlined />,
              label: 'LUT Application',
              onClick: () => router.push('/dashboard/lut'),
            },
            {
              key: '7',
              icon: <UploadOutlined />,
              label: 'Apply for Cancellation',
              onClick: () => router.push('/dashboard/apply'),
            },
            {
              key: '8',
              icon: <UploadOutlined />,
              label: 'Final Return',
              onClick: () => router.push('/dashboard/final'),
            },
            {
              key: '9',
              icon: <UploadOutlined />,
              label: 'Download',
              onClick: () => router.push('/dashboard/download'),
            },
            {
              key: '10',
              icon: <UploadOutlined />,
              label: 'Service Request',
              onClick: () => router.push('/dashboard/requests'),
            },
          ]}
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
              fontSize: '16px',
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
                    key: '1',
                    onClick: () => alert('Profile'),
                  },
                  {
                    label: <Title level={5}>Logout</Title>,
                    key: '2',
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
  )
}

export default DashboardLayout
