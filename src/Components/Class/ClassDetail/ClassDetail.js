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
  Select,
  Modal,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

import Capitalize from "../../hook/capitalize";

import schedule from "../../../Constant/initialData/schedule.json";
import devicesData from "../../../Constant/initialData/device.json";
import classesData from "../../../Constant/initialData/classroom.json";

const ClassDetail = () => {
  const params = useParams();

  const classData = classesData.filter(
    (classroom) => classroom.id == params.classID
  )[0];
  if (classData.address == "Storage") {
    classData.address = "Storage A-666";
  }
  const classDevices = devicesData.filter(
    (device) => device.classID == params.classID
  );
  const classSchedule = schedule.filter(
    (time) => time.classroomId == classData.id
  );

  const changeableRoomID = schedule.filter(
    (room) => room.time != classSchedule.time
  );
  const options = [];
  const changeableRooms = [];
  changeableRoomID.map((id) => {
    let availableRoom = classesData.filter(
      (room) => room.id == id.classroomId
    )[0];
    let roomName = {
      label: availableRoom.address,
      value: availableRoom.address,
    };

    options.push(roomName);
    changeableRooms.push(availableRoom);
  });

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.success("Finish editing, your class is up to date!");
  };

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

  const [editMode, setEditMode] = useState(false);
  function handleEdit() {
    setEditMode(true);
  }
  function handleCancel() {
    setEditMode(false);
    setSwitchRoom(false);
  }
  const [switchRoom, setSwitchRoom] = useState(false);
  const onChangeToFix = () => {
    setSwitchRoom(true);
  };

  const onFinishSwitchRoom = (values) => {};

  const onFinishEdit = (values) => {
    let isChange = false;
    let newClassInfo = classData;

    if (values.address) {
      isChange = true;
      newClassInfo.address = values.address;
    }
    if (values.lastUsed) {
      isChange = true;
      newClassInfo.lastUsed = values.lastUsed;
    }
    if (values.status != classData.status) {
      isChange = true;
      newClassInfo.status = values.status;
    }
    if (values.note) {
      isChange = true;
      newClassInfo.note = values.note;
    }

    success();
    setEditMode(false);
    //post api to submit class changes
  };

  return (
    <div class="m-10">
      {contextHolder}
      <Space direction="vertical" size={50}>
        <Modal
          title="Change room for lecturers"
          open={switchRoom}
          onCancel={handleCancel}
          footer={null}
        >
          <Form name="changeRoom" onFinish={onFinishSwitchRoom}>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please choose at least one room!",
                },
              ]}
            >
              <Select placeholder="address" options={options}></Select>
            </Form.Item>

            <Form.Item
              style={{ marginTop: 25 }}
              name="note"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                //prefix={<BankOutlined className="site-form-item-icon" />}
                placeholder="Note"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="new-user-form-button"
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Form colon={false} onFinish={onFinishEdit} autoComplete="off">
          <Space size={100}>
            <Space direction="vertical" size={50}>
              <Space>
                <div class="text-2xl font-bold">
                  {classData.address.includes("Storage")
                    ? `Storage's information`
                    : `Classroom's information`}
                </div>
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
                      <Select
                        placeholder="status"
                        onChange={onChangeToFix}
                        options={[
                          {
                            value: "open",
                            label: "Open",
                          },
                          {
                            value: "close",
                            label: "Close",
                          },
                          {
                            value: "fixing",
                            label: "Fixing",
                          },
                        ]}
                      ></Select>
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
