
import ToolLayout from '@/layouts/ToolLayout/index';
import RequestUtil from '@/utils/RequestUtil';
import React, { useState } from 'react';
import { Row, Col, Input, Divider, Button, message } from 'antd';
const { TextArea } = Input;
import copy from 'copy-to-clipboard';
import Base64 from 'base-64';

export default function ToolPage(props) {
  const [inputValue, setInputValue] = useState(''); // 关联输入框1
  const [outputValue, setOutputValue] = useState(''); // 关联输入框2
  const [outputDisabled, setOutputDisabled] = useState(true);

  // 点击decode按钮
  const handleEncode = () => {
    if (!inputValue) {
      return;
    }
    const encodedValue = Base64.encode(inputValue);
    setOutputValue(encodedValue);
    setOutputDisabled(false);
  };

  // 点击encode按钮
  const handleDecode = () => {
    if (!inputValue) {
      return;
    }
    const encodedValue = Base64.decode(inputValue);
    setOutputValue(encodedValue);
    setOutputDisabled(false);
  };

  // 处理结果文本修改
  const handleOutputChange = (e) => {
    setOutputValue(e.target.value);
    if (e.target.value === '') {
      setOutputDisabled(true);
    }
  };

  // 点击下载按钮
  const handleDownload = () => {
    if (!outputValue) {
      return;
    }

    const blob = new Blob([outputValue], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 点击复制按钮
  const handleCopy = () => {
    if (!outputValue) {
      return;
    }
    copy(outputValue);
    message.success('已复制到粘贴板');
  };

  // 清除输入输出框内容
  const handleClear = () => {
    setInputValue('');
    setOutputValue('');
    setOutputDisabled(true);
  };

  return (
    <ToolLayout {...props}>

      <Row justify="center" gutter={[16, 16]}>
        <Col span={24}>
          <TextArea
            rows={6}
            placeholder="请输入或者粘贴需要处理的文本"
            autoComplete="off"
            value={inputValue} // 绑定状态到输入框1
            onChange={(e) => setInputValue(e.target.value)} // 更新状态
          />
        </Col>
        <Col span={24}>
          <Divider plain style={{ margin: '0px' }}>to</Divider>
        </Col>
        <Col span={24}>
          <TextArea
            rows={6}
            placeholder="处理结果"
            autoComplete="off"
            value={outputValue} // 绑定状态到输入框2
            disabled={outputDisabled} // 控制输入框2的禁用状态
            onChange={handleOutputChange}
          />
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Row justify="center" gutter={[8, 8]}>
            <Col>
              <Button type="primary" size="large" onClick={handleEncode}>base64编码</Button>
            </Col>
            <Col>
              <Button type="primary" size="large" onClick={handleDecode}>base64解码</Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="center" gutter={[8, 8]}>
            <Col>
              <Button type="primary" size="large" onClick={handleDownload}>下载</Button>
            </Col>
            <Col>
              <Button type="primary" size="large" onClick={handleCopy}>复制</Button>
            </Col>
            <Col>
              <Button type="primary" size="large" onClick={handleClear}>清除</Button>
            </Col>
          </Row>
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
