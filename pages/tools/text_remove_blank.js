import ToolLayout from '@/layouts/ToolLayout/index';
import RequestUtil from '@/utils/RequestUtil';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Input, Button, message, Checkbox } from 'antd';
const { TextArea } = Input;
import copy from 'copy-to-clipboard';

const options = [
  { label: '移除空格', value: '1' },
  { label: '移除制表符', value: '2' },
  { label: '移除回车', value: '3' },
];

export default function ToolPage(props) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(''); // 关联输入框1
  const [outputValue, setOutputValue] = useState(''); // 关联输入框2
  const [selectedOptions, setSelectedOptions] = useState(['1', '2']);
  const [outputDisabled, setOutputDisabled] = useState(true);

  // 点击decode按钮
  const handleRun = () => {
    if (!inputValue) {
      return;
    }

    if (selectedOptions.length === 0) {
      message.error('请选择需要移除的空格,或者回车,或者制表符!');
      return;
    }

    var inputText = inputValue;
    if (selectedOptions.includes('1')) {
      inputText = inputText.replace(/[ ]/g, "");

    }
    if (selectedOptions.includes('2')) {
      inputText = inputText.replace(/\t/ig, "");

    }
    if (selectedOptions.includes('3')) {
      inputText = inputText.replace(/\r/ig, "");
      inputText = inputText.replace(/\n/ig, "");
    }
    setOutputValue(inputText);
    setOutputDisabled(false);
    RequestUtil.addToolUseCount(router);
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
  // 处理checkbox选中结果
  const handleCheckboxChange = (checkedValues) => {
    setSelectedOptions(checkedValues);
  };

  return (
    <ToolLayout {...props}>

      <Row justify="center" gutter={[16, 16]}>
        <Col span={24}>
          <TextArea
            rows={8}
            placeholder="请输入或者粘贴需要处理的文本"
            autoComplete="off"
            value={inputValue} // 绑定状态到输入框1
            onChange={(e) => setInputValue(e.target.value)} // 更新状态
          />
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Row justify="center" gutter={[8, 8]}>
            <Col>
              <Checkbox.Group options={options} value={selectedOptions} onChange={handleCheckboxChange} />
            </Col>
          </Row>
        </Col >
        <Col span={24} style={{ textAlign: 'center' }}>
          <Row justify="center" gutter={[8, 8]}>
            <Col>
              <Button type="primary" onClick={handleRun}>开始移除</Button>
            </Col>
            <Col>
              <Button type="primary" onClick={handleCopy}>复制结果</Button>
            </Col>
            <Col>
              <Button type="primary" onClick={handleDownload}>导出文本</Button>
            </Col>
            <Col>
              <Button type="primary" onClick={handleClear}>清空结果</Button>
            </Col>
          </Row>
        </Col >
        <Col span={24}>
          <TextArea
            rows={8}
            placeholder="处理结果"
            autoComplete="off"
            value={outputValue} // 绑定状态到输入框2
            disabled={outputDisabled} // 控制输入框2的禁用状态
            onChange={handleOutputChange}
          />
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