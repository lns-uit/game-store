import React, { useCallback, useState } from 'react';
import { Layout } from 'antd';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/index';
import { useHistory } from 'react-router-dom';
import { logout } from '../../redux/actions/userAction';

const { Header } = Layout;

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

interface MyHeaderPropstype {
  onOpen: () => void;
}

function MyHeader({ onOpen }: MyHeaderPropstype) {
  const [searchText, setSearchText] = useState('');
  const screens = useBreakpoint();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentTab = useSelector((state: RootState) => state.tab);
  const user = useSelector((state: RootState) => state.user);
  const { userName = '', idUser = '' } = user || {};

  const onPressLogoHeader = () => {
    history.replace('/');
  };

  const renderMenu = useCallback(
    () => (
      <Menu>
        <Menu.Item>
          <Link to={'/user/' + idUser}>Account</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={'/user/collection/' + idUser}>Collection</Link>
        </Menu.Item>
        <Menu.Item>
          <div onClick={handleSignOut}>Sign Out</div>
        </Menu.Item>
      </Menu>
    ),
    [user]
  );

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    dispatch(logout());
    history.replace('/');
  };

  const onHandleSearch = value => {
    // handle searh here with value
    setSearchText(value);
  };

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
          {idUser ? (
            <Dropdown overlay={renderMenu} placement='bottomCenter'>
              <div className='header__top-wrapper--right__user pointer'>
                <UserOutlined />
                {userName}
              </div>
            </Dropdown>
          ) : (
            <div className='header__top-wrapper--right__user gray-6'>
              <Link
                to='/buyer/sign-up'
                className='m-0 global_action_link pointer sign_in_hover'>
                Sign Up
              </Link>
              &nbsp;|&nbsp;
              <Link
                to='/buyer/sign-in'
                className='m-0 global_action_link pointer sign_in_hover'>
                Sign In
              </Link>
            </div>
          )}
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
        <div
          className='header__bottom-wrapper__logo'
          onClick={onPressLogoHeader}>
          <img src={screens.lg ? logo : logoSecondary} alt='logo' />
        </div>
        <InputPrimary
          stylesClassname='header__bottom-wrapper__input'
          text={searchText}
          setText={onHandleSearch}
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
