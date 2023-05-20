import React from 'react';
import BasicLayout from '@/layouts/BasicLayout/index';
import { Card, Row, Col } from 'antd';
import { useRouter } from 'next/router';

const ToolLayout = ({ children, tool }) => {
  const router = useRouter();
  if (!tool) {
    //router.push('/404');
    return null;
  }

  return (
    <BasicLayout title={tool.name} style={{ flex: 1 }}>
      <Row gutter={[16, 16]}>
        <Col span={24} >
          <Card>
            {tool.describe}
          </Card>
        </Col>
        <Col span={24} >
          <Card >
            {children}
          </Card>
        </Col>
        {tool.explanation_html && (
          <Col span={24}>
            <Card>
              <div dangerouslySetInnerHTML={{ __html: tool.explanation_html }}></div>
            </Card>
          </Col>
        )}
      </Row>
    </BasicLayout >
  );
};

export default ToolLayout;
