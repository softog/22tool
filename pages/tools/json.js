import BasicLayout from '@/layouts/BasicLayout/index';
import RequestUtil from '@/utils/RequestUtil';
import CodeEditor from '@/components/tools/CodeEditor';

export default function ToolPage({ tool }) {
  return (
    <BasicLayout title={tool.name} hideFooter={true} >
      <CodeEditor language="json" />
    </BasicLayout>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      tool: await RequestUtil.getTool(context),
    },
  };
}