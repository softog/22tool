import { Menu as AntdMenu } from 'antd';
import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, HomeOutlined, OrderedListOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { TestContext } from '@/pages/_app';


export default function Menu({ background = "#f5f5fb" }) {
  const router = useRouter()
  const selectedKeys = [router.pathname];
  const defaultOpenKeys = ['category'];
  if (router.pathname.includes('/rank')) {
    defaultOpenKeys.push('/rank');
  }
  const { categoryItems } = React.useContext(TestContext);

  const items = [
    {
      label: (
        <Link href="/">
          首页
        </Link>
      ),
      key: '/',
      icon: <HomeOutlined />,
    },
    {
      label: '榜单',
      key: '/rank',
      icon: <OrderedListOutlined />,
      children: [
        {
          label: (<Link href="/rank/new">最新发布</Link>),
          key: '/rank/new',
        },
        {
          label: (<Link href="/rank/hot">最高热度</Link>),
          key: '/rank/hot',
        },
      ],
    },
    {
      label: '类别',
      key: 'category',
      icon: <AppstoreOutlined />,
      children: [],
    },
  ];

  const categoryNode = items.find(node => node.key === 'category');
  if (categoryNode) {
    categoryNode.children = categoryItems.map((tool, index) => ({
      label: (<Link href={`/category/${tool.en_name}`}>{tool.name}</Link>),
      key: `category:${index}`,
    }));
  }

  return (
    <AntdMenu theme="light" mode="inline" items={items} defaultOpenKeys={defaultOpenKeys} defaultSelectedKeys={selectedKeys}
      style={{
        background: background,
        border: '0px'
      }} />
  );
}
