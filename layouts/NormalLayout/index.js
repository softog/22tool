import React from 'react';
import { Card } from 'antd'
import BasicLayout from '../BasicLayout/index';

const NormalLayout = (props) => {
  const { children } = props;
  return (
    <BasicLayout {...props} >
      <Card style={{ flex: 1 }} bodyStyle={{ height: "100%" }}>
        {children}
      </Card>
    </BasicLayout>
  );
};

export default NormalLayout;
