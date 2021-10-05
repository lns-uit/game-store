import { Carousel, Row, Col } from 'antd';
import React, { useRef, useState } from 'react';
import './styles.css';
import ReactPlayer from 'react-player';
import { CarouselRef } from 'antd/lib/carousel';
import { rootColor } from '../../constants/rootColor';

function Slides() {
  const [activeCarousel, setActiveCarousel] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);
  const [btn_animScale, set_btn_animScale] = useState(false);

  return (
    <div className='slides-container'>
      <Row>
        <Col xxl={6} xl={6} lg={8} md={0} sm={0} xs={0}>
          <div className='group-btn-slides'>
            {GameInfoData.map((item, index) =>
              index <= 4 ? (
                <div
                  className='btn-slides'
                  onClick={() => {
                    if (index !== activeCarousel) {
                      set_btn_animScale(true);
                      carouselRef.current?.goTo(index);
                      setActiveCarousel(index);
                    }
                  }}>
                  <div
                    className='btn-slides-main'
                    style={{
                      background:
                        index === activeCarousel
                          ? rootColor.grayContainerColor
                          : 'transparent',
                    }}>
                    <img
                      onAnimationEnd={() => {
                        if (index === activeCarousel) set_btn_animScale(false);
                      }}
                      className={
                        btn_animScale && index === activeCarousel
                          ? 'btn-slides-main-img-scale'
                          : 'btn-slides-main-img-normal'
                      }
                      src={item.icon}
                    />
                    <div className='text-btn-slides-container'>
                      <div className='text-title-slides'>{item.name}</div>
                      <div className='text-type-slides'>{item.type}</div>
                    </div>
                    <div className={'btn-slides-timing-container'}>
                      <div
                        onAnimationEnd={() => {
                          carouselRef.current?.next();
                        }}
                        className={
                          index === activeCarousel
                            ? 'btn-slides-timing'
                            : 'btn-slides-idle'
                        }
                        style={{
                          background: rootColor.lightGrayColor,
                        }}></div>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </Col>
        <Col xxl={18} xl={18} lg={16} md={24} sm={24} xs={24}>
          <Carousel
            className='my-slides'
            ref={carouselRef}
            speed={200}
            // effect="fade"
            afterChange={index => {
              setActiveCarousel(index);
            }}>
            {GameInfoData.map((item, index) =>
              index <= 4 ? (
                <div>
                  <div className='my-slides-element'>
                    {item.videoRepresent !== '' ? (
                      <ReactPlayer
                        style={{
                          position: 'relative',
                          opacity: '0.7',
                          borderRadius: '10px',
                          pointerEvents: 'none',
                          overflow: 'hidden',
                        }}
                        url={item.videoRepresent}
                        playing={true}
                        muted={true}
                        vertical={true}
                        arrows
                        width={'100%'}
                        height={'100%'}
                        loop={true}
                        playsinline
                      />
                    ) : (
                      <img
                        style={{ position: 'relative' }}
                        src={item.imgRepresent}
                      />
                    )}
                    {index === activeCarousel ? (
                      <div className='detail-game-panel'>
                        <h1 className='detail-game-panel-title-text'>
                          {' '}
                          {item.title}{' '}
                        </h1>
                        <div className='detail-game-panel-text'>
                          {item.type}
                          {/* <td dangerouslySetInnerHTML={{__html: item.description}} /> */}
                        </div>
                        <br />
                        <button> {item.textStatus} </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null
            )}
          </Carousel>
        </Col>
      </Row>

      {/* <div className='divide-slides'></div> */}
    </div>
  );
}

export default Slides;

const GameInfoData = [
  {
    id: '',
    name: 'Shot Down',
    iconLarge: '',
    icon: 'https://play-lh.googleusercontent.com/v2vDFLoYKPtDzEZnHythy0CuaII6ldnvS7h7tjI1FGCuSJ43IK6poqZg5kquPLI5RSA=s180-rw',
    routerUrl: '/shot-down',
    title: 'Shot Down',
    description:
      '<p><strong>About game</strong></p><p>Fight and use skills accurately to shoot down the target</p><p>Kill as many targets as you can to survive longer on the map</p>',
    imgRepresent:
      'https://play-lh.googleusercontent.com/JIdbJ4xFGgtMzeaIjws4c13xFwrvgyHs4mPq2zF2Suxbvf0rq58cd9robaUVTERJUQ=w1920-h975-rw',
    videoRepresent: 'https://youtu.be/lsKzl7VYbFw',
    imgURL: [
      'https://play-lh.googleusercontent.com/JIdbJ4xFGgtMzeaIjws4c13xFwrvgyHs4mPq2zF2Suxbvf0rq58cd9robaUVTERJUQ=w1920-h975-rw',
      'https://play-lh.googleusercontent.com/_ZqmvU3b-i6RwBfJzDVzs7zw-YGFq_nN1cfVgJYvZr5GZemFL_Fe5mgR9wedZpaBxZI=w1920-h975-rw',
      'https://play-lh.googleusercontent.com/K9nJ2xERJMMeN_QZ0cVkwplASNauzx6tbdg-fABwbnXUVeiYYqogw50XkJIqiv-A41k=w1920-h975-rw',
    ],
    cost: 'Free to play',
    platform: 'Android',
    type: 'Action - Shooter',
    textStatus: 'PLAY NOW',
    status: false,
  },
  {
    id: '',
    name: 'Flappy Earth',
    iconLarge: '',
    icon: 'https://play-lh.googleusercontent.com/skyj15ZB6vRhb94NbUkuKpjXtwSYHGALIK2IDQ3zIVDK0KLx2Imh6o-4tGgdIALFHzk=s180-rw',
    routerUrl: '/flappy-earth',
    title: 'Flappy Earth',
    description:
      '<p><strong>About game</strong></p><p>Fight and use skills accurately to shoot down the target</p><p>Kill as many targets as you can to survive longer on the map</p>',
    imgRepresent:
      'https://play-lh.googleusercontent.com/kpq-IA7OBYf6TudN77V372c1tZMQHL09MWcytv83A_768_NwP4dd0AjRZV5GnX1XQ1Y=w1920-h975-rw',
    videoRepresent: '',
    imgURL: [
      'https://play-lh.googleusercontent.com/JIdbJ4xFGgtMzeaIjws4c13xFwrvgyHs4mPq2zF2Suxbvf0rq58cd9robaUVTERJUQ=w1920-h975-rw',
      'https://play-lh.googleusercontent.com/_ZqmvU3b-i6RwBfJzDVzs7zw-YGFq_nN1cfVgJYvZr5GZemFL_Fe5mgR9wedZpaBxZI=w1920-h975-rw',
      'https://play-lh.googleusercontent.com/K9nJ2xERJMMeN_QZ0cVkwplASNauzx6tbdg-fABwbnXUVeiYYqogw50XkJIqiv-A41k=w1920-h975-rw',
    ],
    cost: 'Free to play',
    platform: 'Android',
    type: 'Hyper Casual',
    textStatus: 'PLAY NOW',
    status: false,
  },
  {
    id: '',
    name: 'Monster Defender',
    iconLarge: '',
    icon: 'https://play-lh.googleusercontent.com/PypFqxvCh6xrdtzcYlClN3UbHfpaR510ckHBjHuBSHDuzrzsHGtrIHb83y73TxDV_78=s180-rw',
    routerUrl: '/monster-defender',
    title: 'Monster Defender',
    description:
      '<p><strong>About game</strong></p><p>Fight and use skills accurately to shoot down the target</p><p>Kill as many targets as you can to survive longer on the map</p>',
    imgRepresent:
      'https://play-lh.googleusercontent.com/cvtSWj6DdImJbZyhvffk4GQRvucnxi20B3rXD9-55XeUmpBL7cQATs2knqtpx9eWdg=w1920-h975-rw',
    videoRepresent: '',
    imgURL: [
      'https://play-lh.googleusercontent.com/JIdbJ4xFGgtMzeaIjws4c13xFwrvgyHs4mPq2zF2Suxbvf0rq58cd9robaUVTERJUQ=w1920-h975-rw',
      'https://play-lh.googleusercontent.com/_ZqmvU3b-i6RwBfJzDVzs7zw-YGFq_nN1cfVgJYvZr5GZemFL_Fe5mgR9wedZpaBxZI=w1920-h975-rw',
      'https://play-lh.googleusercontent.com/K9nJ2xERJMMeN_QZ0cVkwplASNauzx6tbdg-fABwbnXUVeiYYqogw50XkJIqiv-A41k=w1920-h975-rw',
    ],
    cost: 'Free to play',
    platform: 'Android',
    type: 'Hyper Casual',
    textStatus: 'PLAY NOW',
    status: false,
  },
  {
    id: '',
    name: 'Free to play',
    iconLarge: '',
    icon: 'https://play-lh.googleusercontent.com/PypFqxvCh6xrdtzcYlClN3UbHfpaR510ckHBjHuBSHDuzrzsHGtrIHb83y73TxDV_78=s180-rw',
    routerUrl: '/monster-defender',
    title: 'Free to play',
    description:
      '<p><strong>About game</strong></p><p>Fight and use skills accurately to shoot down the target</p><p>Kill as many targets as you can to survive longer on the map</p>',
    imgRepresent:
      'https://play-lh.googleusercontent.com/cvtSWj6DdImJbZyhvffk4GQRvucnxi20B3rXD9-55XeUmpBL7cQATs2knqtpx9eWdg=w1920-h975-rw',
    videoRepresent: '',
    imgURL: [
      'https://play-lh.googleusercontent.com/JIdbJ4xFGgtMzeaIjws4c13xFwrvgyHs4mPq2zF2Suxbvf0rq58cd9robaUVTERJUQ=w1920-h975-rw',
      'https://play-lh.googleusercontent.com/_ZqmvU3b-i6RwBfJzDVzs7zw-YGFq_nN1cfVgJYvZr5GZemFL_Fe5mgR9wedZpaBxZI=w1920-h975-rw',
      'https://play-lh.googleusercontent.com/K9nJ2xERJMMeN_QZ0cVkwplASNauzx6tbdg-fABwbnXUVeiYYqogw50XkJIqiv-A41k=w1920-h975-rw',
    ],
    cost: 'Free to play',
    platform: 'Android',
    type: '',
    textStatus: 'PLAY NOW',
    status: false,
  },
  {
    id: '',
    name: 'Sniper Legendary',
    iconLarge: '',
    icon: 'https://play-lh.googleusercontent.com/PypFqxvCh6xrdtzcYlClN3UbHfpaR510ckHBjHuBSHDuzrzsHGtrIHb83y73TxDV_78=s180-rw',
    routerUrl: '/sniper-legendary',
    title: 'Sniper Legendary',
    description:
      '<p><strong>About game</strong></p><p>Fight and use skills accurately to shoot down the target</p><p>Kill as many targets as you can to survive longer on the map</p>',
    imgRepresent:
      'https://play-lh.googleusercontent.com/cvtSWj6DdImJbZyhvffk4GQRvucnxi20B3rXD9-55XeUmpBL7cQATs2knqtpx9eWdg=w1920-h975-rw',
    videoRepresent: '',
    imgURL: [
      'https://play-lh.googleusercontent.com/JIdbJ4xFGgtMzeaIjws4c13xFwrvgyHs4mPq2zF2Suxbvf0rq58cd9robaUVTERJUQ=w1920-h975-rw',
      'https://play-lh.googleusercontent.com/_ZqmvU3b-i6RwBfJzDVzs7zw-YGFq_nN1cfVgJYvZr5GZemFL_Fe5mgR9wedZpaBxZI=w1920-h975-rw',
      'https://play-lh.googleusercontent.com/K9nJ2xERJMMeN_QZ0cVkwplASNauzx6tbdg-fABwbnXUVeiYYqogw50XkJIqiv-A41k=w1920-h975-rw',
    ],
    cost: 'Free to play',
    platform: 'Window',
    type: 'FPS - Shooter',
    textStatus: 'TRY NOW',
    status: false,
  },
  {
    id: '',
    name: 'Ha Noi 12 Ngay Dem Ha Noi 12 Ngay Dem',
    iconLarge: '',
    icon: 'https://play-lh.googleusercontent.com/PypFqxvCh6xrdtzcYlClN3UbHfpaR510ckHBjHuBSHDuzrzsHGtrIHb83y73TxDV_78=s180-rw',
    routerUrl: '/monster-defender',
    title: 'Ha Noi 12 Ngay Dem Ha Noi 12 Ngay Dem',
    description:
      '<p><strong>About game</strong></p><p>Fight and use skills accurately to shoot down the target</p><p>Kill as many targets as you can to survive longer on the map</p>',
    imgRepresent:
      'https://play-lh.googleusercontent.com/cvtSWj6DdImJbZyhvffk4GQRvucnxi20B3rXD9-55XeUmpBL7cQATs2knqtpx9eWdg=w1920-h975-rw',
    videoRepresent: '',
    imgURL: [
      'https://play-lh.googleusercontent.com/JIdbJ4xFGgtMzeaIjws4c13xFwrvgyHs4mPq2zF2Suxbvf0rq58cd9robaUVTERJUQ=w1920-h975-rw',
      'https://play-lh.googleusercontent.com/_ZqmvU3b-i6RwBfJzDVzs7zw-YGFq_nN1cfVgJYvZr5GZemFL_Fe5mgR9wedZpaBxZI=w1920-h975-rw',
      'https://play-lh.googleusercontent.com/K9nJ2xERJMMeN_QZ0cVkwplASNauzx6tbdg-fABwbnXUVeiYYqogw50XkJIqiv-A41k=w1920-h975-rw',
    ],
    cost: 'Free to play',
    platform: 'Android',
    type: 'FPS - Shooter',
    textStatus: 'TRY NOW',
    status: false,
  },
];
