import React from 'react';
import BasicLayout from '@/layouts/BasicLayout/index';
import { Card, Row, Col } from 'antd';
import { useRouter } from 'next/router';

const ToolLayout = ({ children, tool }) => {
  const { name = "新建工具", describe = "新建工具描述", explanation_html } = tool || {};

  return (
    <BasicLayout title={name} style={{ flex: 1 }}>
      <Row gutter={[16, 16]}>
        <Col span={24} >
          <Card>
            {describe}
          </Card>
        </Col>
        <Col span={24} >
          <Card >
            {children}
          </Card>
        </Col>
        {explanation_html && (
          <Col span={24}>
            <Card>
              <div dangerouslySetInnerHTML={{ __html: explanation_html }}></div>
            </Card>
          </Col>
        )}
      </Row>
    </BasicLayout >
  );
};

export default ToolLayout;
