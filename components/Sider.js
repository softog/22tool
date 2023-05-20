import { Layout, Avatar } from 'antd'
import Logo from '@/components/Logo';
import Menu from '@/components/Menu';
import styles from './sider.module.css';

export default function Sider() {
  return (
    <Layout.Sider className={`${styles.sider} md-hide`} width="220" >
      <div className={styles.logo}>
        <Logo />
      </div>
      <Menu />
    </Layout.Sider >
  );
}
