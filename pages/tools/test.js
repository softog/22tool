import { useState } from "react";
import ToolLayout from '@/layouts/ToolLayout/index';
import RequestUtil from '@/utils/RequestUtil';
import { Table, Empty, Row, Col, message, Button, Form, Input, Radio, Space, Select, DatePicker, InputNumber, TimePicker } from "antd";
import copy from 'copy-to-clipboard';
const { Option } = Select;
import 'dayjs/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN'; // 引入中文语言包

export default function ToolPage(props) {
  const [uuids, setUUIDs] = useState("");

  const onFinish = (values) => {
  };

  const onCopy = () => {
  }

  const onClear = () => {
  };

  return (
    <ToolLayout {...props}>
      <Row>
        <Col span={8} >
          <Form onFinish={onFinish} layout="vertical" size="large"
            autoComplete="off"
            labelAlign="left"
          >
            <Form.Item label="开始时间" style={{ padding: "-10px" }}>
              <Space.Compact size="large">
                <Form.Item name={['address', 'province']}>
                  <DatePicker locale={locale} />
                </Form.Item>
                <Form.Item name={['address', 'street']}>
                  <TimePicker locale={locale} />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
            <Form.Item label="计算方式" name="uppercase" initialValue="add" style={{ padding: "0" }}>
              <Radio.Group id="mode" style={{ marginTop: "-20px" }}>
                <Radio value={1}>增加</Radio>
                <Radio value={2}>减少</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="uppercase" initialValue="add">
              <Row gutter={[8, 8]}>
                <Col span={12} >
                  <InputNumber addonBefore="年" defaultValue={100} />
                </Col>
                <Col span={12} >
                  <InputNumber addonBefore="月" defaultValue={100} />
                </Col>
                <Col span={12} >
                  <InputNumber addonBefore="天" defaultValue={100} />
                </Col>
                <Col span={12} >
                  <InputNumber addonBefore="时" defaultValue={100} />
                </Col>
                <Col span={12} >
                  <InputNumber addonBefore="分" defaultValue={100} />
                </Col>
                <Col span={12} >
                  <InputNumber addonBefore="秒" defaultValue={100} />
                </Col>
              </Row>
            </Form.Item>
          </Form >
        </Col>
      </Row>
    </ToolLayout >
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      tool: await RequestUtil.getTool(context),
    },
  };
}