import { Layout, Card, Avatar, Button, Popover, Tooltip, Col, Row } from 'antd'
import { MenuOutlined, GithubOutlined } from '@ant-design/icons';
import Logo from '@/components/Logo';
import Menu from '@/components/Menu';
import styles from './header.module.css';

export default function Header() {
  return (
    <Layout.Header className={styles.header}>
      <Card className='md-hide' bodyStyle={{ paddingTop: "18px", paddingBottom: "18px" }}>
        <Tooltip title="Github">
          <Button type="text"
            style={{ float: "right" }}
            icon={< GithubOutlined style={{ display: "flex", fontSize: 18, justifyContent: "center" }} />}
            onClick={() => window.open("https://github.com/softog/22tool", "_blank")}
          />
        </Tooltip>
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
