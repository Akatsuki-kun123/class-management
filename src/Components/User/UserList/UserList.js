import "./UserList.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Space, Table, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

import data from "../../../Constant/user.json";

const userAttribute = [
  {
    title: "Name",
    dataIndex: "fullName",
    key: "fullName",
    render: (text, record) => (
      <Link to={`/account/${record.accountID}`}>{text}</Link>
    ),
  },
  {
    title: "Role",
    key: "role",
    render: (record) => <div>{record.account.role}</div>,
  },
  {
    title: "Email",
    key: "email",
    render: (record) => <div>{record.account.email}</div>,
  },
  {
    title: "Active status",
    key: "active",
    render: (record) => (
      <div>{record.account.active ? "Actived" : "Unactive"}</div>
    ),
  },
];

const UserList = () => {
  const classesData = data.filter((classroom) => classroom.id != 0);

  const [isAddUser, setIsAddUser] = useState(false);
  const showAddUserModal = () => {
    setIsAddUser(true);
  };
  const handleCancel = () => {
    setIsAddUser(false);
  };
  const onFinishAdd = (values) => {
    let newAccount = {
      email: values.email,
      password: values.password,
      role: values.role,
    }
  }

  return (
    <Space direction="vertical" size={50}>
      <Space id="header-container">
        <div class="text-2xl font-bold">Users Information</div>
        <Button style={{ border: "none" }}>
          <EditOutlined style={{ fontSize: 20 }} />
        </Button>
      </Space>

      <div class="px-10">
        <Table
          scroll={{ y: 700 }}
          columns={userAttribute}
          dataSource={classesData}
          pagination={{ pageSize: 20 }}
        />
      </div>
    </Space>
  );
};

export default UserList;
