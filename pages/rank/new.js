import BasicLayout from '@/layouts/BasicLayout/index';
import ToolCardList from '@/components/ToolListCard';

export default function HomePage({ data }) {
  return (
    <BasicLayout title='最新发布'>
      <h1 style={{ paddingBottom: '16px' }}>最新发布</h1>
      <ToolCardList toolList={data} />
    </BasicLayout>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://tool.softog.com/api/tool?sort_by=use_count');
  let data = await res.json();
  data = data.data;
  return {
    props: {
      data,
    },
  };
}