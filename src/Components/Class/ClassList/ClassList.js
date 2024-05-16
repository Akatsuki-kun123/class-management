import React from "react";
import { Link } from "react-router-dom";

import { Table } from "antd";

import data from "../../../Constant/classroom.json";

const columns = [
  {
    title: "Classroom",
    dataIndex: "classNum",
    key: "classNum",
    render: (text, record) => <Link to={`/detail/${record.id}`}>{text}</Link>,
  },
  {
    title: "Last Used",
    dataIndex: "lastUsed",
    key: "lastUsed",
  },
  {
    title: "Num of devices",
    dataIndex: "numOfDevice",
    key: "numOfDevice",
  },
  {
    title: "Note",
    key: "note",
    dataIndex: "note",
  },
];

const ClassList = () => {
  const classesData = data.filter((classroom) => classroom.id != 0);

  return <Table columns={columns} dataSource={classesData} />;
};

export default ClassList;
