import React, { useEffect, useRef, useState } from 'react';
import { Carousel, Col, Row } from 'antd';
import './styles.css';
import DotsCustom from '../DotsCustom/DotsCustom';
import { GameInfoType } from '../../interfaces/rootInterface';
import { Grid } from 'antd';
import { SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons';
import { CarouselRef } from 'antd/lib/carousel';

const { useBreakpoint } = Grid;

interface MyCarouselPropsType {
  games: GameInfoType[];
  dotsHorizontal?: boolean;
}

function MyCarousel({ games, dotsHorizontal }: MyCarouselPropsType) {
  const screens = useBreakpoint();
  const carouselRef = useRef<CarouselRef>(null);

  useEffect(() => {
    console.log(screens);
  }, [screens]);

  const dotsInfo = games.map(game => {
    return { name: game.name, image: game.image };
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const handleCarouselAction = (action: string) => {
    if (action === 'prev') {
      carouselRef.current?.prev();
    } else if (action === 'next') {
      carouselRef.current?.next();
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col
        className='my-carousel__dots-container'
        xxl={dotsHorizontal ? 24 : 6}
        xl={dotsHorizontal ? 24 : 6}
        lg={dotsHorizontal ? 24 : 6}
        md={24}
        sm={24}
        xs={24}
        order={dotsHorizontal ? 2 : 1}>
        {dotsHorizontal && (
          <>
            <button
              className='my-carousel__action my-carousel__action--prev'
              onClick={() => handleCarouselAction('prev')}>
              <SwapLeftOutlined />
            </button>
            <button
              className='my-carousel__action my-carousel__action--next'
              onClick={() => handleCarouselAction('next')}>
              <SwapRightOutlined />
            </button>
          </>
        )}
        <DotsCustom
          isHorizontal={dotsHorizontal}
          dotsInfo={dotsInfo}
          activeIndex={activeIndex}
        />
      </Col>
      <Col
        xxl={dotsHorizontal ? 24 : 18}
        xl={dotsHorizontal ? 24 : 18}
        lg={dotsHorizontal ? 24 : 18}
        md={24}
        sm={24}
        xs={24}
        order={dotsHorizontal ? 1 : 2}>
        <Carousel
          ref={carouselRef}
          className='my-carousel'
          autoplay
          dots={dotsHorizontal}
          afterChange={index => {
            setActiveIndex(index);
          }}>
          {games.map(game => (
            <div className='my-carousel__item'>
              <img src={game.image} alt='carousel-image' />
              <div className='my-carousel__item__description'>
                {dotsHorizontal && <h2>{game.name}</h2>}
                <p>{game.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
}

export default MyCarousel;
