import BasicLayout from '@/layouts/BasicLayout/index';
import RequestUtil from '@/utils/RequestUtil';
import CodeEditor from '@/components/tools/CodeEditor';
import { format } from 'sql-formatter';

function customFormat(value) {
  return format(value, { language: 'sql' })
}

export default function ToolPage({ tool }) {
  return (
    <BasicLayout title={tool.name} hideFooter={true} >
      <CodeEditor language="sql" customFormat={customFormat} />
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