import { useState } from "react";
import ToolLayout from '@/layouts/ToolLayout/index';
import RequestUtil from '@/utils/RequestUtil';
import { Row, Col, Form, Radio, Space, DatePicker, InputNumber, TimePicker, Card } from "antd";
import 'dayjs/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN'; // 引入中文语言包
import dayjs from 'dayjs';

export default function ToolPage(props) {
  // 保存计算结果的状态
  const [result, setResult] = useState(props.date);

  const handleValuesChange = (changedValues, allValues) => {
    var date = allValues.date;
    const { time, mode, year, month, day, hour, minute, second } = allValues;

    if (null != time) {
      date = dayjs(date)
        .startOf('day')
        .set('hour', time.hour())
        .set('minute', time.minute())
        .set('second', time.second());

    } else {
      date = dayjs(date)
        .startOf('day')
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0);
    }

    const duration = {
      years: year || 0,
      months: month || 0,
      days: day || 0,
      hours: hour || 0,
      minutes: minute || 0,
      seconds: second || 0,
    };

    if (mode === 'add') {
      date = dayjs(date)
        .add(duration.years, 'year')
        .add(duration.months, 'month')
        .add(duration.days, 'day')
        .add(duration.hours, 'hour')
        .add(duration.minutes, 'minute')
        .add(duration.seconds, 'second');
    } else if (mode === 'sub') {
      date = dayjs(date)
        .subtract(duration.years, 'year')
        .subtract(duration.months, 'month')
        .subtract(duration.days, 'day')
        .subtract(duration.hours, 'hour')
        .subtract(duration.minutes, 'minute')
        .subtract(duration.seconds, 'second');
    }

    const formattedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    setResult(formattedDate);
  };
  const currentDatetime = new Date(); // 获取当前日期和时间

  return (
    <ToolLayout {...props}>
      <Row justify="center">
        <Col xs={24} sm={24} md={20} lg={18} xl={13}>
          <Form onValuesChange={handleValuesChange}
            layout="vertical"
            initialValues={{ date: dayjs(currentDatetime), mode: 'add' }}
            autoComplete="off"
            labelAlign="left"
          >
            <Form.Item label="开始时间">
              <Space.Compact style={{ margin: 0, width: "100%" }} block={true}>
                <Form.Item name='date' noStyle >
                  <DatePicker locale={locale} allowClear={false} style={{ margin: 0, width: "100%" }} />
                </Form.Item>
                <Form.Item name='time' noStyle >
                  <TimePicker locale={locale} style={{ margin: 0, width: "100%" }} />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
            <Form.Item label="计算方式" name="mode" >
              <Radio.Group>
                <Radio value="add">增加</Radio>
                <Radio value="sub">减少</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Row gutter={[8, 8]}>
                <Col span={12} >
                  <Form.Item name='year' noStyle >
                    <InputNumber addonBefore="年" placeholder="0" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12} >
                  <Form.Item name='month' noStyle >
                    <InputNumber addonBefore="月" placeholder="0" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12} >
                  <Form.Item name='day' noStyle >
                    <InputNumber addonBefore="天" placeholder="0" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12} >
                  <Form.Item name='hour' noStyle >
                    <InputNumber addonBefore="时" placeholder="0" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12} >
                  <Form.Item name='minute' noStyle >
                    <InputNumber addonBefore="分" placeholder="0" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12} >
                  <Form.Item name='second' noStyle >
                    <InputNumber addonBefore="秒" placeholder="0" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item label="计算结果" name="val" >
              <Card>
                {result}
              </Card>
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
      date: dayjs(new Date()).format('YYYY-MM-DD 00:00:00'),
    },
  };
}