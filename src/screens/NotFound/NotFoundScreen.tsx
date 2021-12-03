import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import './styles.css';

function NotFoundScreen() {
  return (
    <div className='not-found-screen_container'>
      <img src={Logo} alt='not-found' />
      <div className='not-found__text-wrapper'>
        <p>404...Not Found</p>
        <Link to='/' className='link-home'>
          Go to home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundScreen;
