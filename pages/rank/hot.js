import BasicLayout from '@/layouts/BasicLayout/index';
import ToolCardList from '@/components/ToolListCard';

export default function HomePage({ data }) {
  return (
    <BasicLayout title='最高热度'>
      <h1 style={{ paddingBottom: '16px' }}>最高热度</h1>
      <ToolCardList toolList={data} />
    </BasicLayout>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://tool.softog.com/api/tool');
  let data = await res.json();
  data = data.data;
  return {
    props: {
      data,
    },
  };
}