import './App.css';
import { Layout } from 'antd';
import MyHeader from './components/MyHeader/MyHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import RootNavigation from './navigation/RootNavigation';
import { Row, Col } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import MyDrawer from './components/MyDrawer/MyDrawer';
import MyFooter from './components/MyFooter/MyFooter';
import { useSelector } from 'react-redux';
import { RootState } from './redux/reducers';
import ConsoleHeader from './components/AdminConsole/ConsoleHeader/ConsoleHeader';
import ConsoleNav from './components/AdminConsole/ConsoleNav/ConsoleNav';

const { Content } = Layout;

function App() {
  const screens = useBreakpoint();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <>
      <Router>
        <Layout>
          {window.location.pathname.split('/')[1] === 'admin' ? (
            <div
              className='header-stun-console'
              style={{ display: user?.roles === 'admin' ? 'block' : 'none' }}>
              <ConsoleHeader />
            </div>
          ) : (
            <MyHeader onOpen={onOpen} />
          )}
          {/* <div style = {{display: window.location.pathname.split('/')[1]==="admin" ? "none" : "block"}}>
            <MyHeader onOpen={onOpen} />
          </div>
          <div 
              className = "header-stun-console" 
              style = {{display: window.location.pathname.split('/')[1]==="admin" ? "block" : "none"}}
          >
            <ConsoleHeader/>
          </div> */}
          {!screens.lg && <MyDrawer isOpen={isOpen} onClose={onClose} />}
          <Content
            style={{
              marginTop:
                window.location.pathname.split('/')[1] === 'admin'
                  ? '70px'
                  : '100px',
            }}
            className={
              window.location.pathname.split('/')[1] !== 'admin'
                ? `site-layout${!screens.lg ? ' site-layout--md' : ''}`
                : 'site-layout-admin'
            }>
            <RootNavigation />
          </Content>
          <div
            style={{
              display:
                window.location.pathname.split('/')[1] === 'admin'
                  ? 'none'
                  : 'block',
            }}>
            <MyFooter />
          </div>
        </Layout>
      </Router>
    </>
  );
}

export default App;
