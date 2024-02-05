import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Header as HeaderComponent,
  theme,
  Button,
  Dropdown,
  Space,
} from "antd";
import React, { useState } from "react";

import {} from "antd";

const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

console.log("hello world");

const Header = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
        {/* <Dropdown menu={{ items }} trigger={["hover"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <BellOutlined />
            </Space>
          </a>
        </Dropdown> */}
        <Badge count={6}>
          <Button
            type="text"
            icon={<BellOutlined className="text-lg" color="#000" />}
          />
        </Badge>
        <Button type="text" icon={<UserOutlined className="text-lg" />} />
      </span>
    </HeaderComponent>
  );
};

export default Header;
