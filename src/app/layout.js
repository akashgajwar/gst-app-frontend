'use client'
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
const { Header, Sider, Content } = Layout

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <html lang="en">
      <body className={inter.className}>
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
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1',
                  icon: <UserOutlined />,
                  label: 'Dashboard',
                },
                {
                  key: '2',
                  icon: <VideoCameraOutlined />,
                  label: 'Profile',
                },
                {
                  key: '3',
                  icon: <UploadOutlined />,
                  label: 'Payment',
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
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
              <span>
                <Badge count={5}>
                  <Button
                    type="text"
                    icon={<BellOutlined className="text-lg" color="#000" />}
                    // onClick={() => setCollapsed(!collapsed)}
                  />
                </Badge>
                <Button
                  type="text"
                  icon={<UserOutlined className="text-lg" />}
                  // onClick={() => setCollapsed(!collapsed)}
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
      </body>
    </html>
  )
}
