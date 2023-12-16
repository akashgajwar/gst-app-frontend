'use client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Inter } from 'next/font/google'
import './globals.css'

import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons'

import { Badge, Layout, Menu, Button, theme } from 'antd'
import { useRouter } from 'next/navigation'
const { Header, Sider, Content } = Layout

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)

  const router = useRouter()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <Layout
            style={{
              height: '100vh',
            }}
          >
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              className="pt-14"
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
                    onClick: () => router.push('/returns'),
                  },
                  {
                    key: '2',
                    icon: <VideoCameraOutlined />,
                    label: 'Annual Return',
                    onClick: () => router.push('/annual-returns'),
                  },
                  {
                    key: '3',
                    icon: <UploadOutlined />,
                    label: 'Refunds',
                    onClick: () => router.push('/refunds'),
                  },
                  {
                    key: '4',
                    icon: <UploadOutlined />,
                    label: 'Amendments',
                    onClick: () => router.push('/amendments'),
                  },
                  {
                    key: '5',
                    icon: <UploadOutlined />,
                    label: 'Other Filings',
                    onClick: () => router.push('/other'),
                  },
                  {
                    key: '6',
                    icon: <UploadOutlined />,
                    label: 'LUT Application',
                    onClick: () => router.push('/lut'),
                  },
                  {
                    key: '7',
                    icon: <UploadOutlined />,
                    label: 'Apply for Cancellation',
                    onClick: () => router.push('/apply'),
                  },
                  {
                    key: '8',
                    icon: <UploadOutlined />,
                    label: 'Final Return',
                    onClick: () => router.push('/final'),
                  },
                  {
                    key: '9',
                    icon: <UploadOutlined />,
                    label: 'Download',
                    onClick: () => router.push('/download'),
                  },
                  {
                    key: '10',
                    icon: <UploadOutlined />,
                    label: 'Service Request',
                    onClick: () => router.push('/requests'),
                  },
                ]}
              />
            </Sider>
            <Layout>
              <Header
                className="flex justify-between p-0"
                style={{
                  background: colorBgContainer,
                }}
              >
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />
                <span className="pr-4">
                  <Badge count={5}>
                    <Button
                      type="text"
                      icon={<BellOutlined className="text-lg" color="#000" />}
                    />
                  </Badge>
                  <Button
                    type="text"
                    icon={<UserOutlined className="text-lg" />}
                  />
                </span>
              </Header>
              <Content
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </QueryClientProvider>
      </body>
    </html>
  )
}
