import { Carousel, Row, Col, Button } from 'antd';
import React, { useDebugValue, useEffect, useRef, useState } from 'react';
import './styles.css';
import ReactPlayer from 'react-player/lazy';
import { CarouselRef } from 'antd/lib/carousel';
import { rootColor } from '../../constants/rootColor';
import axios from 'axios';
import { Endpoint } from '../../api/endpoint';
import { GameType } from '../../interfaces/rootInterface';
import numberWithCommas from '../../utils/numberWithCommas';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
interface SlideData {
  gameData: GameType[] | null;
}

function Slides({gameData}: SlideData) {
  const [activeCarousel, setActiveCarousel] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);
  const [btn_animScale, set_btn_animScale] = useState(false);
  const history = useHistory();
  const isResMb = useMediaQuery({ query: '(min-width: 992px)' })
  useEffect(()=>{
    // GetCarouselData();
  },[])

  return (
    <div className='slides-container'>
      <Row>
        <Col xxl={6} xl={6} lg={6} md={0} sm={0} xs={0}>
          <div className='group-btn-slides'>
            {gameData?.map((item, index) =>
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
                          ? '#222222'
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
                      src={item.imageGameDetail[0].url}
                    />
                    <div className='text-btn-slides-container'>
                      <div className='text-title-slides'>{item.nameGame}</div>
                      <div style = {{color:"#adadad"}}>
                          {item.publisher}
                      </div>
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
                          background: '#222222' ,
                        }}></div>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <Carousel
            className='my-slides'
            ref={carouselRef}
            speed={200}
            draggable = {!isResMb ? true : false}
            dots = {isResMb ? false : true}
            afterChange={index => {
              setActiveCarousel(index);
            }}>
            {gameData?.map((item, index) =>
              index <= 4 ? (
                <div>
                  <div className='my-slides-element'>
                      
                      <img
                        style={{
                          position: 'relative',
                          opacity: '0.7',
                          borderRadius: '10px',
                          pointerEvents: 'none',
                          overflow: 'hidden',
                        }}
                        src={item.imageGameDetail[1].url !==null ? item.imageGameDetail[1].url : null}
                      />
  
                    {index === activeCarousel ? (
                      <div className='detail-game-panel'>
                        <h1 className='detail-game-panel-title-text'>
                          {' '}
                          {item.nameGame}{' '}
                        </h1>
                        <div className='detail-game-panel-text'>
                          {item.genres.map((value,index)=>(
                            <span>
                              {value.idGenreNavigation.nameGenre} &nbsp;
                            </span>
                          ))}
                          <br/><br/>
                          {
                            item.discount == null ? 
                            <b>
                              {item.cost === 0 ? "Free" : numberWithCommas(item.cost)}
                            </b> :
                            <b>
                              {parseFloat(item.cost)-item.cost*item.discount.percentDiscount/100 === 0 ? "Free Game" : numberWithCommas(parseFloat(item.cost)-item.cost*item.discount.percentDiscount/100)}
                            </b>
                          }
                      
                        </div>
                        <br />
                        <button onClick={()=>{history.push('/game/'+item.idGame)}} > PLAY NOW </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null
            )}
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}

export default Slides;

