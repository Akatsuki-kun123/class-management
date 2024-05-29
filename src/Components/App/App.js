import "./App.css";

import React, { useState } from "react";
import {
  Route,
  Routes,
  useNavigate,
  BrowserRouter,
  createBrowserRouter,
  json,
} from "react-router-dom";

import {
  Menu,
  Form,
  theme,
  Modal,
  Input,
  Layout,
  Button,
  Checkbox,
  Breadcrumb,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import UserList from "../User/UserList/UserList.js";
import UserDetail from "../User/UserDetail/UserDetail.js";
import DeviceDetail from "../Device/DeviceDetail.js";
import ClassList from "../Class/ClassList/ClassList.js";
import ClassDetail from "../Class/ClassDetail/ClassDetail.js";

import useWindowDimensions from "../hook/useWindowDimensions.js";
import ReportSider from "../Report/ReportSider.js";
import Password from "antd/es/input/Password.js";

const { Header, Content, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({ key, label: `nav ${key}` }));

const router = createBrowserRouter([
  {
    path: "/classList",
    element: <ClassList></ClassList>,
  },
  {
    path: "/detail/classroom/:classID",
    element: <ClassDetail></ClassDetail>,
  },
]);

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
        nav("/");
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

  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    let newUser = {
      email: values.email,
      password: values.password,
    }
    setUser(newUser);

    if (values.remember) {
      localStorage.setItem("user", JSON.stringify(newUser, null, '\t'));
    }

    setIsModalOpen(false);
  };

  console.log(localStorage.getItem("user"))

  return (
    <Layout style={{ minHeight: height, minWidth: width }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Button
          style={{
            right: 15,
            position: "absolute",
          }}
          onClick={showModal}
        >
          Login
        </Button>
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
              <Breadcrumb.Item></Breadcrumb.Item>
              <Breadcrumb.Item></Breadcrumb.Item>
              <Breadcrumb.Item></Breadcrumb.Item>
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
              {user ? (
                <Routes>
                  <Route path="/" element={<UserList></UserList>}></Route>

                  <Route
                    path="/account/:accountID"
                    element={<UserDetail></UserDetail>}
                  ></Route>

                  <Route
                    path="/classList"
                    element={<ClassList></ClassList>}
                  ></Route>

                  <Route
                    path="/detail/classroom/:classID"
                    element={<ClassDetail></ClassDetail>}
                  ></Route>

                  <Route
                    path="/detail/classroom/:classID/device/:deviceID"
                    element={<DeviceDetail></DeviceDetail>}
                  ></Route>
                </Routes>
              ) : (
                <Modal
                  title="Login"
                  open={isModalOpen}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <Form
                    name="login"
                    className="login-form"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        noStyle
                      >
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>

                      <Button className="login-form-forgot">
                        Forgot password
                      </Button>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Log in
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              )}
            </Content>
          </Layout>
          {width < 1500 ? (
            <></>
          ) : (
            <Sider
              width={300}
              style={{
                background: colorBgContainer,
              }}
            >
              {user ? <ReportSider></ReportSider> : <></>}
            </Sider>
          )}
        </Layout>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
