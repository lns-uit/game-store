import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import MyHeader from './components/MyHeader/MyHeader';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    // <div className='app'>
    <Layout>
      <MyHeader />
    </Layout>
    // </div>
  );
}

export default App;
