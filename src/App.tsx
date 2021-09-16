import './App.css';
import { Layout } from 'antd';
import MyHeader from './components/MyHeader/MyHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import RootNavigation from './navigation/RootNavigation';
import { Row, Col } from 'antd';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <MyHeader />
        <Content className='site-layout'>
          <RootNavigation />
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
