import React, { useState } from 'react';
import { Layout } from 'antd';
import './styles.css';
import Tab from '../Tab/Tab';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import { rootColor } from '../../constants/rootColor';
import InputPrimary from '../InputPrimary/InputPrimary';
import { SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;

const tabs = [
  {
    name: 'discover',
    linkTo: '',
  },
  {
    name: 'browse',
    linkTo: '',
  },
  {
    name: 'help',
    linkTo: '',
  },
  {
    name: 'faq',
    linkTo: '',
  },
];

function MyHeader() {
  const [searchText, setSearchText] = useState('');
  return (
    <Header className='header'>
      <div className='header__top-wrapper'>
        <div className='header__tabs header__top-wrapper--left'>
          {tabs.map(tab => (
            <Tab key={`tab-${tab.name}`} text={tab.name} />
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
        <div className='header__bottom-wrapper__logo'></div>
        <InputPrimary
          stylesClassname='header__bottom-wrapper__input'
          text={searchText}
          setText={setSearchText}
          placeholder='Search'
          icon={<SearchOutlined />}
        />

        <div className='header__bottom-wrapper__wish-list'>WishList</div>
      </div>
    </Header>
  );
}

export default MyHeader;
