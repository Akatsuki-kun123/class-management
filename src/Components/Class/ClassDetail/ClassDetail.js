import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Form,
  Flex,
  Table,  
  Empty,
  Input,
  Space,
  Image,
  Button,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

import Capitalize from "../../hook/capitalize";

import devicesData from "../../../Constant/device.json";
import classesData from "../../../Constant/classroom.json";

const ClassDetail = () => {
  const params = useParams();

  const classData = classesData.filter(
    (classroom) => classroom.id == params.classID
  )[0];
  const classDevices = devicesData.filter(
    (device) => device.classID == params.classID
  );

  const devicesColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/detail/classroom/${params.classID}/device/${record.id}`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Note",
      key: "note",
      dataIndex: "note",
    },
  ];

  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info("Sorry you can't edit classroom value :((");
  };

  const [editMode, setEditMode] = useState(false);
  function handleEdit() {
    setEditMode(true);
  }
  function handleCancel() {
    setEditMode(false);
  }

  return (
    <div class="m-10">
      {contextHolder}
      <Space direction="vertical" size={50}>
        <Form colon={false} onFinish={info} autoComplete="off">
          <Space size={100}>
            <Space direction="vertical" size={50}>
              <Space>
                <div class="text-2xl font-bold">Classroom's information</div>
                <Button style={{ border: "none" }} onClick={handleEdit}>
                  <EditOutlined style={{ fontSize: 20 }} />
                </Button>
              </Space>
              <Space size={50}>
                <Space direction="vertical">
                  <Form.Item
                    name="address"
                    label={<div class="font-bold text-xl">Address:</div>}
                  >
                    {editMode ? (
                      <Input
                        defaultValue={Capitalize(classData.address)}
                      ></Input>
                    ) : (
                      <div class="text-xl">{Capitalize(classData.address)}</div>
                    )}
                  </Form.Item>

                  <Form.Item
                    name="lastUsed"
                    label={<div class="font-bold text-xl">Last used time:</div>}
                  >
                    {editMode ? (
                      <Input defaultValue={classData.lastUsed}></Input>
                    ) : (
                      <span class="text-xl">{classData.lastUsed}</span>
                    )}
                  </Form.Item>
                </Space>

                <Space direction="vertical">
                  <Form.Item
                    name="status"
                    label={<div class="font-bold text-xl">Status:</div>}
                  >
                    {editMode ? (
                      <Input defaultValue={classData.status}></Input>
                    ) : (
                      <span class="text-xl">
                        {Capitalize(classData.status)}
                      </span>
                    )}
                  </Form.Item>

                  <Form.Item
                    name="facilityAmount"
                    label={
                      <div class="font-bold text-xl">Number of devices:</div>
                    }
                  >
                    <div class="text-xl">{classData.facilityAmount}</div>
                  </Form.Item>
                </Space>
              </Space>

              <Space direction="vertical" size="large">
                <div class="text-2xl font-bold">Note</div>
                {editMode ? (
                  <Form.Item name="note">
                    {classData.note ? (
                      <TextArea
                        rows={5}
                        style={{ minWidth: 640 }}
                        defaultValue={classData.note}
                      ></TextArea>
                    ) : (
                      <Empty class="text-xl" description={false}></Empty>
                    )}
                  </Form.Item>
                ) : (
                  <>
                    {classData.note ? (
                      <p class="text-xl">{classData.note}</p>
                    ) : (
                      <Empty class="text-xl" description={false}></Empty>
                    )}
                  </>
                )}
              </Space>
            </Space>

            <div class="ml-10">
              <Image
                src={require("../../../assets/classroom.png")}
                width={200}
                height={200}
              />
            </div>
          </Space>

          <Form.Item>
            {editMode ? (
              <Flex style={{ marginTop: 50 }} justify="center" align="center">
                <Space size={10}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button type="" htmlType="submit" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Space>
              </Flex>
            ) : (
              <></>
            )}
          </Form.Item>
        </Form>

        <Space direction="vertical" size={25}>
          <div class="text-2xl font-bold">Class's devices</div>
          <Table
            columns={devicesColumns}
            dataSource={classDevices}
            style={{ minWidth: 1200 }}
          ></Table>
        </Space>
      </Space>
    </div>
  );
};

export default ClassDetail;
