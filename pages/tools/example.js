import ToolLayout from '@/layouts/ToolLayout/index';
import RequestUtil from '@/utils/RequestUtil';
import { Button, message } from 'antd';

export default function ToolPage(props) {
  const onButtonClick = () => {
    message.success('Hello World');
  };

  return (
    <ToolLayout {...props}>
      <p>这个是示例工具页面，如果需要创建新工具可以将此页面复制并改成新工具名称，名称为全小写下划线间隔。</p>
      <Button onClick={onButtonClick}>Hello Tool</Button>
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