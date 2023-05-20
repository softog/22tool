import React from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '@/layouts/BasicLayout/index';
import ToolCardList from '@/components/ToolListCard';

const CategoryPage = ({ category }) => {
  const router = useRouter();
  const { en_name } = router.query;

  console.log(en_name);
  if (!category) {
    return <div>{en_name} Category not found</div>;
  }

  return (
    <BasicLayout title={category.name}>
      <h1 style={{ paddingBottom: '16px' }}>{category.name}</h1>
      <ToolCardList toolList={category.tools} />
    </BasicLayout>
  );
};

export async function getServerSideProps(context) {
  const { en_name } = context.query;
  const res = await fetch(`https://tool.softog.com/api/category/${en_name}/tool`);
  let data = await res.json();

  if (res.status !== 200 || !data || data.code !== 200) {
    return {
      props: {
        category: null,
      },
    };
  }

  data = data.data;

  return {
    props: {
      category: data,
    },
  };
}
export default CategoryPage;
