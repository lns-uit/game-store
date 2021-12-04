import React, { useEffect, useRef, useState } from 'react';
import { Carousel, Col, Row } from 'antd';
import './styles.css';
import DotsCustom from '../DotsCustom/DotsCustom';
import { DotInfoType, GameInfoType } from '../../interfaces/rootInterface';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CarouselRef } from 'antd/lib/carousel';

interface MyCarouselPropsType {
  images: {
    idImage: string;
    url: string;
  }[];
}

function MyCarousel({ images }: MyCarouselPropsType) {
  const carouselRef = useRef<CarouselRef>(null);

  const dotsInfo = images.map(image => {
    return { image: image.url };
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCarouselAction = (action: string, value: number | null) => {
    if (action === 'prev') {
      carouselRef.current?.prev();
    } else if (action === 'next') {
      carouselRef.current?.next();
    } else if (action === 'slideTo') {
      if (value != null) {
        carouselRef.current?.goTo(value);
      }
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
        <Carousel
          ref={carouselRef}
          className='my-carousel'
          autoplay
          dots={false}
          afterChange={index => {
            setActiveIndex(index);
          }}>
          {images.map(image => (
            <div className='my-carousel__item'>
              <img src={image.url} alt='carousel-image' />
            </div>
          ))}
        </Carousel>
      </Col>
      <Col
        className='my-carousel__dots-container'
        xxl={24}
        xl={24}
        lg={24}
        md={24}
        sm={24}
        xs={24}>
        <button
          className='my-carousel__action'
          onClick={() => handleCarouselAction('prev', null)}>
          <LeftOutlined />
        </button>
        <DotsCustom
          dotsInfo={dotsInfo}
          activeIndex={activeIndex}
          slideTo={handleCarouselAction}
        />
        <button
          className='my-carousel__action'
          onClick={() => handleCarouselAction('next', null)}>
          <RightOutlined />
        </button>
      </Col>
    </Row>
  );
}

export default MyCarousel;
