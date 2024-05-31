import "./App.css";

import React, { useState } from "react";
import {
  Route,
  Routes,
  useNavigate,
  BrowserRouter,
  createBrowserRouter,
} from "react-router-dom";

import {
  Menu,
  Form,
  theme,
  Image,
  Space,
  Modal,
  Input,
  Layout,
  Button,
  message,
  Checkbox,
  Breadcrumb,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import ReportSider from "../Report/ReportSider.js";
import DeviceDetail from "../Device/DeviceDetail.js";
import UserList from "../User/UserList/UserList.js";
import UserDetail from "../User/UserDetail/UserDetail.js";
import { ClassList } from "../Class/ClassList/ClassList.js";
import ClassDetail from "../Class/ClassDetail/ClassDetail.js";

import usersData from "../../Constant/user.json";
import useWindowDimensions from "../hook/useWindowDimensions.js";

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
        nav("/accountList");
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

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Login successfully, welcomeback Captain!",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Wrong email or password, please login again!",
    });
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isModalOpen, setIsModalOpen] = useState(true);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    let logUser = {
      email: values.email,
      password: values.password,
    };
    let hasUser = usersData.filter(
      (user) => user.account.email == logUser.email
    );
    if (hasUser.length == 0) {
      error();
      return 0;
    }

    success();
    setUser(hasUser[0]);
    if (values.remember) {
      localStorage.setItem("user", JSON.stringify(hasUser[0], null, "\t"));
    }

    setIsModalOpen(false);
  };

  return (
    <Layout style={{ minHeight: height, minWidth: width }}>
      {contextHolder}
      <Header>
        <div class="absolute right-16">
          {user ? (
            <Button type="" style={{ minHeight: 62, border: "none", backgroundColor: "#001529" }}>
              <Space>
                <Image
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.accountID}`}
                  width={40}
                  height={40}
                  preview={false}
                />
                <div class="text-white">{user.fullName}</div>
              </Space>
            </Button>
          ) : (
            <Button onClick={showModal}>Login</Button>
          )}
        </div>
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
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {user ? (
                <Routes>
                  <Route
                    path="/accountList"
                    element={<UserList></UserList>}
                  ></Route>

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
