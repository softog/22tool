import ToolLayout from '@/layouts/ToolLayout/index';
import RequestUtil from '@/utils/RequestUtil';

import { useState } from "react";
import { Button, Typography, Card, Table, Input, Empty, Row, Col } from "antd";

const { Title } = Typography;
const { Search } = Input;

export default function ToolPage(props) {

  var nzhcn = require("nzh/cn");

  const [data, setData] = useState([
    // {
    //   key: '1',
    //   name: '金额写法',
    //   value: '123'
    // },
    // {
    //   key: '2',
    //   name: '胡彦祖',
    //   value: '123'
    // },
  ]);

  const onSearch = (value) => {
    if (!value) {
      setData([]);
      return;
    }
    setData([
      {
        key: '1',
        name: '金额写法',
        value: nzhcn.toMoney(value, { outSymbol: false }),
      },
      {
        key: '2',
        name: '汉字写法	',
        value: nzhcn.encodeS(value),
      },
    ]);
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '数据',
      dataIndex: 'value',
      key: 'value',
    }
  ];
  const customLocale = {
    emptyText: <Empty description="请输入需要转换的数字, 点击按钮进行转换" />,
  };


  return (
    <ToolLayout {...props}>
      <Row justify="center" gutter={[16, 16]} >
        <Col xs={24} sm={24} md={20} lg={18} xl={13}>
          <Search
            placeholder="请输入需要转换的数字"
            allowClear
            enterButton="转换"
            size="large"
            onSearch={onSearch}
          />
        </Col>

        <Col xs={24} sm={24} md={20} lg={18} xl={13}>
          <Table dataSource={data} columns={columns} pagination={false} showHeader={false} bordered={true} locale={customLocale} />
        </Col>
      </Row>
    </ToolLayout>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      tool: await RequestUtil.getTool(context),
    },
  };
}
