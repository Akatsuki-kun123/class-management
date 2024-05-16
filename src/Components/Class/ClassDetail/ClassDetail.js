import React from "react";
import { useParams } from "react-router-dom";

import { Card, List, Space } from "antd";

import devicesData from "../../../Constant/device.json";

const ClassDetail = () => {
  const params = useParams();

  const classDevices = devicesData.filter(
    (device) => device.classID == params.classID
  );
  const computersData = classDevices.filter(
    (device) => device.deviceType == "computer"
  );
  const othersDevices = classDevices.filter(
    (device) => device.deviceType != "computer"
  );

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <div>Accessory</div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={othersDevices}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.deviceType}>
              Status: {item.status}
            </Card>
          </List.Item>
        )}
      />
      <div>Computer</div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={computersData}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.deviceType}>
              Status: {item.status}
            </Card>
          </List.Item>
        )}
      />
    </Space>
  );
};

export default ClassDetail;
