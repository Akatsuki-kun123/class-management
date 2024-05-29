import React from "react";
import { Link } from "react-router-dom";

import { Table } from "antd";

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
    render: (record) => <div>{record.account.role}</div>
  },
  {
    title: "Email",
    key: "email",
    render: (record) => <div>{record.account.email}</div>
  },
  {
    title: "Active status",
    key: "active",
    render: (record) => <div>{record.account.active ? "Actived" : "Unactive"}</div>
  },
];

const UserList = () => {
  const classesData = data.filter((classroom) => classroom.id != 0);

  return (
    <Table
      scroll={{ y: 700 }}
      columns={userAttribute}
      dataSource={classesData}
      pagination={{ pageSize: 20 }}
    />
  );
};

export default UserList;
