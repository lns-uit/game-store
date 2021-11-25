import React, { useState } from 'react';
import { Button, Layout } from 'antd';
import './styles.css';
import Tab from '../Tab/Tab';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import { rootColor } from '../../constants/rootColor';
import InputPrimary from '../InputPrimary/InputPrimary';
import { SearchOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import logoSecondary from '../../assets/images/logoSecondary.png';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { Menu, Dropdown } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/index';

const { Header } = Layout;
const idUser = '123';

const tabs = [
  {
    name: 'discover',
    linkTo: '/',
  },
  {
    name: 'browse',
    linkTo: '/browse?page=1',
  },
  {
    name: 'help',
    linkTo: '/help',
  },
  {
    name: 'faq',
    linkTo: '/faq',
  },
];

const signOut = ()=>{
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userName");
  window.location.reload();
}

const menu = (
  <Menu>
    <Menu.Item>
      <Link
        to={'/user/' + idUser}
      >
        Account
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link
        to={'/user/collection/' + idUser}
      >
        Collection
      </Link>
    </Menu.Item>
    <Menu.Item>
      <div onClick={signOut}>
        Sign Out
      </div>
    </Menu.Item>
  </Menu>
);

interface MyHeaderPropstype {
  onOpen: () => void;
}

function MyHeader({ onOpen }: MyHeaderPropstype) {
  const [searchText, setSearchText] = useState('');
  const currentTab = useSelector((state: RootState) => state.tab);
  const screens = useBreakpoint();
  const isLogin = localStorage.getItem("accessToken") !== null;
  const userName = localStorage.getItem("userName");

  return (
    <Header className={`header${!screens.lg ? ' header--md' : ''}`}>
      <div className='header__top-wrapper hide-on-md'>
        <div className='header__tabs header__top-wrapper--left'>
          {tabs.map((tab, index) => (
            <Link to={tab.linkTo}>
              <Tab
                key={`tab-${tab.name}`}
                text={tab.name}
                active={currentTab === tab.linkTo}
              />
            </Link>
          ))}
        </div>
        <div className='header__top-wrapper--right'>
          {
            isLogin ? 
            <Dropdown overlay={menu} placement='bottomCenter'>
              <div className='header__top-wrapper--right__user pointer'>
                <UserOutlined />
                {userName}
              </div>
            </Dropdown> :
            <div className='header__top-wrapper--right__user gray-6'>
              <Link to="/buyer/sign-up" className='m-0 global_action_link pointer sign_in_hover'>Sign Up</Link>              
                &nbsp;|&nbsp;
              <Link to="/buyer/sign-in" className='m-0 global_action_link pointer sign_in_hover'>Sign In</Link>
            </div>
          }
          <ButtonPrimary
            text='GET LAUNCHER'
            callback={() => console.log('get launcher')}
            containerColor={rootColor.redColor}
            borderColor={rootColor.redColor}
            styleClass={'header__top-wrapper--right__btn-get-launcher'}
          />
        </div>
      </div>

      <div className='header__bottom-wrapper'>
        <div className='header__bottom-wrapper__logo'>
          <img src={screens.lg ? logo : logoSecondary} alt='logo' />
        </div>
        <InputPrimary
          stylesClassname='header__bottom-wrapper__input'
          text={searchText}
          setText={setSearchText}
          placeholder='Search'
          icon={<SearchOutlined />}
        />

        <div className='header__bottom-wrapper__wish-list'>
          {screens.lg ? (
            'Wish list'
          ) : (
            <button className='header__drawer-btn' onClick={onOpen}>
              <MenuOutlined className='header__drawer-btn__icon' />
            </button>
          )}
          {/* WishList */}
        </div>
      </div>
    </Header>
  );
}

export default MyHeader;
