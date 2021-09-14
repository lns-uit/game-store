import './App.css';
import { Spin, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='app'>
      <p>This is text</p>
    </div>
  );
}

export default App;
