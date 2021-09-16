import React, { useState } from 'react';
import { Carousel, Col, Row } from 'antd';
import './styles.css';
import DotsCustom from '../DotsCustom/DotsCustom';
import { GameInfoType } from '../../interfaces/rootInterface';

interface MyCarouselPropsType {
  games: GameInfoType[];
}

function MyCarousel({ games }: MyCarouselPropsType) {
  const dotsInfo = games.map(game => {
    return { name: game.name, image: game.image };
  });
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <DotsCustom dotsInfo={dotsInfo} activeIndex={activeIndex} />
      </Col>
      <Col span={18}>
        <Carousel
          className='my-carousel'
          autoplay
          dotPosition={'left'}
          dots={false}
          afterChange={index => {
            setActiveIndex(index);
          }}>
          {games.map(game => (
            <div className='my-carousel__item'>
              <img src={game.image} alt='carousel-image' />
              <p className='my-carousel__item__description'>
                {game.description}
              </p>
            </div>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
}

export default MyCarousel;
