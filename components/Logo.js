import { Layout, Avatar } from 'antd'
import Menu from '@/components/Menu';
import Link from 'next/link';
import styles from './logo.module.css';

export default function Logo() {
  return (
    <div className={styles.title}>
      <Link href="/">
        <Avatar shape="square" src={`${process.env.assetPrefix}/static/image/logo.png`} style={{ marginTop: "-5px" }} />
        <span className={styles.titleText}> 22工具箱</span>
      </Link>
    </div>
  );
}
