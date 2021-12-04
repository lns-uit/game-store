import React from 'react';
import { Drawer, Button } from 'antd';
import './styles.css';
import { rootColor } from '../../constants/rootColor';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import rootConfigTab from '../../constants/configTab';

interface MyDrawerPropsType {
  isOpen: boolean;
  onClose: () => void;
}

const tabs = rootConfigTab.DRAWER_TABS;

function MyDrawer({ isOpen, onClose }: MyDrawerPropsType) {
  const currentTab = useSelector((state: RootState) => state.tab);
  const user = useSelector((state: RootState) => state.user);
  const { realName, username } = user || {};

  return (
    <Drawer
      title={`Hello ${realName || username}`}
      className='my-drawer'
      placement='right'
      onClose={onClose}
      closable={true}
      bodyStyle={{
        backgroundColor: rootColor.grayContainerColor,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      headerStyle={{
        backgroundColor: rootColor.grayContainerColor,
        border: 0,
        color: rootColor.whiteColor,
      }}
      visible={isOpen}>
      <div className='my-drawer__tabs'>
        {tabs.map((tab, index) => (
          <Link
            onClick={onClose}
            key={`my-drawer__tab-${index}`}
            className={`my-drawer__tab${
              tab.linkTo === currentTab ? ' my-drawer__tab--active' : ''
            }`}
            to={tab.linkTo}>
            {tab.name}
          </Link>
        ))}
      </div>

      <div className='my-drawer__bottom'>
        <button
          className='my-drawer__bottom__btn my-drawer__bottom__btn--sign-out'
          onClick={onClose}>
          Sign in
        </button>
        <button
          className='my-drawer__bottom__btn my-drawer__bottom__btn--get-launcher'
          onClick={onClose}>
          Get launcher game
        </button>
      </div>
    </Drawer>
  );
}

export default MyDrawer;
