import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import { useEffect } from "react";

const { Header, Sider } = Layout;

const GeekLayout = () => {
  const { userStore, loginStore, channelStore } = useStore();
  // 获取用户数据
  useEffect(() => {
    try {
      userStore.getUserInfo();
      channelStore.loadChannelList();
    } catch {}
  }, [userStore, channelStore]);

  // 退出登录
  const navigate = useNavigate();
  const onConfirm = () => {
    loginStore.loginOut();
    navigate("/login");
  };

  const { pathname } = useLocation();

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">user</span>
          <span className="user-logout">
            <Popconfirm
              onConfirm={onConfirm}
              title="是否确认退出？"
              oktext="退出"
              canceltext="取消">
              {/* onConfirm={onConfirm} */}
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            style={{ height: "100vh", borderRight: 0 }}>
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default observer(GeekLayout);
