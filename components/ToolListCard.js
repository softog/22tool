import { useEffect, useState } from 'react'
import { Card, Col, Row, Avatar } from 'antd'
import BasicLayout from '@/layouts/BasicLayout/index';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

function ToolCard({ name, en_name, describe }) {
  return (
    <Link href={`/${en_name}`}>
      <Card
        hoverable={true}
        bordered={false}
        headStyle={{
          padding: '0 12px'
        }}
        title={
          <span>
            <Avatar shape="square" style={{ marginRight: '6px' }} src={`${process.env.assetPrefix}/static/tools/${en_name}.svg`} />
            {name}
          </span>
        }
      >
        <div style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          height: '44px',
          lineHeight: '22px',
        }}>
          {describe}
        </div>
      </Card>
    </Link>
  );
}

function ToolListCard({ toolList }) {
  return (
    <Row gutter={[16, 16]}>
      {
        toolList.map((item, index) => (
          <Col className="gutter-row" key={index} xs={24} sm={24} md={12} lg={12} xl={6} >
            <ToolCard name={item.name} describe={item.describe} en_name={item.en_name} />
          </Col>
        ))
      }
    </Row>
  )
}

export default ToolListCard;