import NormalLayout from '@/layouts/NormalLayout/index';
import { Button, Result } from 'antd';
import Link from 'next/link';

export default function Home() {
  return (
    <NormalLayout title="页面未找到">
      <Result
        status="404"
        title="404"
        subTitle="很抱歉这个页面找不到了"
        extra={<Link href={'/'}><Button type="primary">返回首页</Button></Link>}
      />
    </NormalLayout>
  )
}
