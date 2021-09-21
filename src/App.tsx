import './App.css';
import { Layout } from 'antd';
import MyHeader from './components/MyHeader/MyHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import RootNavigation from './navigation/RootNavigation';
import { Row, Col } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useState } from 'react';
import MyDrawer from './components/MyDrawer/MyDrawer';
import MyFooter from './components/MyFooter/MyFooter';

const { Content } = Layout;

function App() {
  const screens = useBreakpoint();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <Router>
      <Layout>
        <MyHeader onOpen={onOpen} />
        <MyDrawer isOpen={isOpen} onClose={onClose} />
        <Content
          className={`site-layout${!screens.lg ? ' site-layout--md' : ''}`}>
          <RootNavigation />
        </Content>
        <MyFooter />
      </Layout>
    </Router>
  );
}

export default App;
