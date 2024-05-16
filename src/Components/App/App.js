import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";

import { Menu, theme, Layout, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import ClassList from "../Class/ClassList/ClassList.js";
import ClassDetail from "../Class/ClassDetail/ClassDetail.js";

const { Header, Content, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({ key, label: `nav ${key}` }));

function useWindowDimensions() {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}

const NavBar = () => {
  const nav = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const siderItems = [
    {
      key: `account`,
      icon: React.createElement(UserOutlined),
      label: `Account`,
      onClick: () => {
        console.log("Click");
      },
    },
    {
      key: `classrooms`,
      icon: React.createElement(LaptopOutlined),
      label: `Classroom`,
      onClick: () => {
        nav("/classList");
      },
    },
    {
      key: `storage`,
      icon: React.createElement(NotificationOutlined),
      label: `Storage`,
      onClick: () => {
        nav("/detail/classroom/0");
      },
    },
  ];

  return (
    <Sider
      width={200}
      style={{
        background: colorBgContainer,
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["account"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={siderItems}
      />
    </Sider>
  );
};

const App = () => {
  const { height, width } = useWindowDimensions();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: height, minWidth: width }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>

      <BrowserRouter>
        <Layout>
          <NavBar></NavBar>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <Content
              style={{
                margin: 0,
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/classList" element={<ClassList></ClassList>}></Route>
                <Route
                  path="/detail/classroom/:classID"
                  element={<ClassDetail></ClassDetail>}
                ></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
