import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Badge, Header as HeaderComponent, theme, Button } from 'antd'
import React, { useState } from 'react'

const Header = () => {
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <HeaderComponent
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
        <Button type="text" icon={<UserOutlined className="text-lg" />} />
      </span>
    </HeaderComponent>
  )
}

export default Header
