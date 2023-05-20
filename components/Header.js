import { Layout, Card, Avatar, Button, Popover } from 'antd'
import { MenuOutlined } from '@ant-design/icons';
import Logo from '@/components/Logo';
import Menu from '@/components/Menu';
import styles from './header.module.css';


export default function Header() {
  return (
    <Layout.Header className={styles.header}>
      <Card className='md-hide'>
        测试
      </Card>
      <div className={`${styles.mobile}`}>
        <Logo />
        <Popover placement="bottom" content={<Menu background="#ffffff" />} trigger="click"
          overlayInnerStyle={{
            marginRight: "10px",
            width: "230px"
          }}>
          <MenuOutlined style={{
            display: "flex",
            position: "absolute",
            top: "20px",
            right: "40px",
            fontSize: 16,
            margin: "5px",
          }} />
        </Popover>

      </div>
    </Layout.Header >
  );
}
