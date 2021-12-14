import { Row, Col, Button } from "antd";
import React, { useEffect, useState } from "react";
import numOfItemInGrid from "../../utils/numOfItemInGrid";
import GameItem from "../GameItem/GameItem";
import GamesContainer from "../GamesContainer/GamesContainer";
import "./style.css";
const numOfItemsDisplay = {
  freeNow: 4,
  mostPopular: 4,
  topGamesWeek: 6,
};
const ButtonCarousel = () => {
  return (
    <div className="btn-slides">
      <div className="btn-slides-main-loading">
        <div className={"btn-slides-main-img-normal"}></div>
        <div className="text-btn-slides-container">
          <div className="text-title-slides"></div>
          <div style={{ color: "#adadad" }}></div>
        </div>
      </div>
    </div>
  );
};
const ButtonGameItem = () => {
  return (
    <div
      className={'game-item'}style={{ backgroundColor: 'white',width:'100%' }}>
      <div className='game-item__container'>
        <div className='game-item__image'> </div>
        <div className='game-item__detail-wrapper'>
          <p className='game-item__detail-wrapper__name'></p>
          <div className='game-item__detail-wrapper__price-container'>
          </div>
        </div>
      </div>
    </div>
  )
}
function DiscoverLoading() {
  return (
    <div className="slides-container" style={{ marginTop: '30px' }}>
      <Row>
        <Col xxl={6} xl={6} lg={7} md={0} sm={0} xs={0}>
          <ButtonCarousel></ButtonCarousel>
          <ButtonCarousel></ButtonCarousel>
          <ButtonCarousel></ButtonCarousel>
          <ButtonCarousel></ButtonCarousel>
          <ButtonCarousel></ButtonCarousel>
        </Col>
        <Col xxl={18} xl={18} lg={16} md={24} sm={24} xs={24}>
          <div className="my-slides">
            <div>
              <div className="my-slides-element-loading"></div>
            </div>
          </div>
        </Col>
      </Row>
      <div className = "bottom-loading-discover-short"></div>
      <div className = "bottom-loading-discover"></div>
      <div className = "bottom-loading-discover-short"></div>
      <div className = "bottom-loading-discover"></div>
      <div className = "bottom-loading-discover-short"></div>
      <div className = "bottom-loading-discover"></div>
    </div>
  );
}

export default DiscoverLoading;
