import "./ClassList.css";

import React from "react";
import { Link } from "react-router-dom";

import { Table, Space, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

import data from "../../../Constant/classroom.json";

const ClassTable = (props) => {
  const classesData = [];
  if (props.schedule == undefined) {
    data
      .filter((classroom) => classroom.id != 0)
      .map((classroom) => {
        classesData.push(classroom);
      });
  } else {
    props.schedule.map((id) => {
      data
        .filter((classroom) => classroom.id == id.classroomId)
        .map((classroom) => {
          classroom.time = id.time;
          classesData.push(classroom);
        });
    });
  }

  const listAttribute = [
    {
      title: "Classroom",
      dataIndex: "address",
      key: "address",
      render: (text, record) => (
        <Link to={`/detail/classroom/${record.id}`}>{text}</Link>
      ),
    },
    props.schedule
      ? {
          title: "Time",
          key: "time",
          render: (record) => <div>{record.time}</div>,
        }
      : {
          title: "Last Used",
          dataIndex: "lastUsed",
          key: "lastUsed",
        },
    {
      title: "Num of devices",
      dataIndex: "facilityAmount",
      key: "facilityAmount",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
  ];

  return (
    <Table
      scroll={{ y: props.scroll ? props.scroll : 600 }}
      columns={listAttribute}
      dataSource={classesData}
      pagination={{ pageSize: props.pageSize ? props.pageSize : 23 }}
    />
  );
};

const ClassList = () => {
  return (
    <Space direction="vertical" size={50}>
      <Space id="header-container">
        <div class="text-2xl font-bold">Classrooms Information</div>
        <Button style={{ border: "none" }}>
          <EditOutlined style={{ fontSize: 20 }} />
        </Button>
      </Space>

      <div class="px-10">
        <ClassTable></ClassTable>
      </div>
    </Space>
  );
};

export { ClassList as ClassList, ClassTable as ClassTable };
