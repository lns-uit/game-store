import React, { useState } from 'react';
import { Layout } from 'antd';
import './styles.css';
import Tab from '../Tab/Tab';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import { rootColor } from '../../constants/rootColor';
import InputPrimary from '../InputPrimary/InputPrimary';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import logoSecondary from '../../assets/images/logoSecondary.png';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Header } = Layout;

const tabs = [
  {
    name: 'discover',
    linkTo: '/',
  },
  {
    name: 'browse',
    linkTo: '/browse',
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
  const [activeTab, setActiveTab] = useState(0);
  const screens = useBreakpoint();

  return (
    <Header className={`header${!screens.lg ? ' header--md' : ''}`}>
      <div className='header__top-wrapper hide-on-md'>
        <div className='header__tabs header__top-wrapper--left'>
          {tabs.map((tab, index) => (
            <Link to={tab.linkTo} onClick={() => setActiveTab(index)}>
              <Tab
                key={`tab-${tab.name}`}
                text={tab.name}
                active={activeTab === index}
              />
            </Link>
          ))}
        </div>
        <div className='header__top-wrapper--right'>
          <ButtonPrimary
            text='GET LAUNCHER'
            callback={() => console.log('get launcher')}
            containerColor={rootColor.redColor}
            borderColor={rootColor.redColor}
            styleClass={'header__top-wrapper--right__btn-get-launcher'}
          />
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
