import BasicLayout from '@/layouts/BasicLayout/index';
import ToolCardList from '@/components/ToolListCard';
import { cache } from '@/pages/_app';

export default function HomePage({ data }) {
  return (
    <BasicLayout>
      <ToolCardList toolList={data} />
    </BasicLayout>
  );
}
export async function getStaticProps() {
  let data = cache.get('tool');

  if (!data) {
    const res = await fetch('https://tool.softog.com/api/tool');
    const json = await res.json();
    data = json.data;
    cache.set('tool', data);
  }

  return {
    props: {
      data: data || null, // 确保 data 有一个初始值
    },
  };
}