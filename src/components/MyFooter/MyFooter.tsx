import React from 'react';
import { Col, Layout, Row } from 'antd';
import './styles.css';
import {
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
  SkypeFilled,
  YoutubeFilled,
} from '@ant-design/icons';
import logoSecondary from '../../assets/images/logoSecondary.png';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { Link } from 'react-router-dom';
const { Footer } = Layout;

function MyFooter() {
  const screens = useBreakpoint();
  return (
    <Footer className={`my-footer${!screens.lg ? ' my-footer--md' : ''}`}>
      <Row gutter={[16, 16]} className='my-footer__top'>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className='my-footer__company-wrapper'>
            <div className='my-footer__company-name'>LNS-UIT</div>
            <p className='my-footer__company-members__title'>Members Coop:</p>
            <div className='my-footer__company-members'>
              <p>Nguyễn Hữu Khắc Phục</p>
              <p>Phạm Mạnh Lợi</p>
              <p>Trần Đình Khôi</p>
              <p>Ngô Văn Khải</p>
            </div>
          </div>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className='my-footer__socials'>
            <a href='https://www.facebook.com/'>
              <FacebookFilled className='my-footer__social-icon my-footer__social-icon--facebook' />
            </a>
            <a href='https://www.facebook.com/'>
              <TwitterSquareFilled className='my-footer__social-icon my-footer__social-icon--twitter' />
            </a>
            <a href='https://www.facebook.com/'>
              <LinkedinFilled className='my-footer__social-icon my-footer__social-icon--linkedin' />
            </a>
            <a href='https://www.facebook.com/'>
              <SkypeFilled className='my-footer__social-icon my-footer__social-icon--skype' />
            </a>
            <a href='https://www.facebook.com/'>
              <YoutubeFilled className='my-footer__social-icon my-footer__social-icon--youtube' />
            </a>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className='my-footer__bottom'>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className='my-footer__copy-right'>
            <p>
              Generally copyright sign (perceived by some as "copyright logo")
              is rendered as a black and white c in circle icon, not a colored
              icon - copyright emoji. A copyright notice, either as © c circled
              copyright symbol or phrase, informs users of the underlying claim
              to ownership credit for a published work. For sound recordings you
              should use produced ℗ symbol instead
            </p>
          </div>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className='my-footer__bottom-right-wrapper'>
            <div className='my-footer__icon'>
              <img src={logoSecondary} alt='my-footer-icon' />
            </div>
            <div className='my-footer__policies'>
              <Link to='/term-of-service'>
                <p>Terms of Service</p>
              </Link>
              <Link to='/privacy-policy'>
                <p>Privacy Policy</p>
              </Link>
              <Link to='/store-refund-policy'>
                <p>Store Refund Policy</p>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Footer>
  );
}

export default MyFooter;
