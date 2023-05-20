import ToolLayout from '@/layouts/ToolLayout/index';
import RequestUtil from '@/utils/RequestUtil';
import { useState, useEffect } from "react";
import { Table, Input, Empty, Row, Col, message } from "antd";
const { Search } = Input;

export default function ToolPage(props) {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');


  const onSearch = (value) => {
    if (value == "") {
      setData([]);
      return;
    }
    requestIP(value);
  };

  const requestIP = (value) => {
    fetch(`https://tool.softog.com/api/ip?q=${value}`)
      .then(response => response.json())
      .then(data => {
        if (data.code !== 200) {
          message.error(data.msg);
          setData([]);
          return;
        }



        setData([
          {
            key: 1,
            name: '国家',
            value: data.data.country,
          },
          {
            key: 2,
            name: '省份',
            value: data.data.province,
          },
          {
            key: 3,
            name: '城市',
            value: data.data.city,
          },
          {
            key: 4,
            name: '服务商',
            value: data.data.isp,
          }
        ]);
        setInputValue(data.data.ip);
      })
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
    emptyText: <Empty description="请输入需要查询的IP地址, 点击按钮进行查询" />,
  };

  useEffect(() => {
    requestIP('');
  }, []);

  return (
    <ToolLayout {...props}>
      <Row justify="center" gutter={[16, 16]} >
        <Col xs={24} sm={24} md={20} lg={18} xl={13}>
          <Search
            placeholder="请输入需要查询的IP地址"
            allowClear
            enterButton="查询"
            size="large"
            onSearch={onSearch}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Col>

        <Col xs={24} sm={24} md={20} lg={18} xl={13}>
          <Table dataSource={data} columns={columns} pagination={false} showHeader={false} bordered={true} locale={customLocale} />
        </Col>
      </Row>
    </ToolLayout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      tool: await RequestUtil.getTool(context),
    },
  };
}

