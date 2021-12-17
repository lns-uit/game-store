import React, { useRef } from 'react';
import PriceGame from '../../components/PriceGame/PriceGame';
import { Row, Col } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';
import MyCarousel from '../../components/MyCarousel/MyCarousel';
import { BillType, GameDetailss } from '../../interfaces/rootInterface';
interface Detail {
  game: GameDetailss;
  bill: BillType | undefined;
}

function LayoutGameDetail1({ game,bill }: Detail) {
  const { nameGame } = game || {};
  return (
    <div className='cover'>
      <Row gutter={[48, 8]}>
        <Col xxl={18} xl={18} lg={24} md={24} sm={24} xs={24}>
          <div className='flex-1-1-auto max-width-1029'>
            <div className='m-bottom-24'>
              <div className='text-cover d-inline-block'>
                <h3 className='white m-0 fs-48 lh-56 uppercase'>{nameGame}</h3>
              </div>
            </div>
            <div className='d-inline-block width-full cover-img button-none'>
              <div className='max-width-910 max-height-580'>
                <MyCarousel images={game.imageGameDetail} urlVideo={game.urlVideo} />
              </div>
            </div>
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={24} md={24} sm={24} xs={24}>
          <div className='height-full white pd-bottom-20'>
            <PriceGame game={game} bill = {bill} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LayoutGameDetail1;
