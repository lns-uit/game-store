import { Tag, Row, Col, Tooltip } from 'antd';
import React, { CSSProperties } from 'react';
import { rootColor } from '../../constants/rootColor';
import { ActionType,GameType} from '../../interfaces/rootInterface';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import './styles.css';

interface GameItemPropsType {
  game: GameType;
  action?: ActionType;
  isHorizontal?: boolean;
  heightImage?: string;
}

function GameItem({
  game,
  action,
  isHorizontal,
  heightImage,
}: GameItemPropsType) {
  console.log(game.imageGameDetail)
  const urlGameDefault = "https://yt3.ggpht.com/hN71s4RgKl13k2T3a7C_mL-ktwEC6k-F0-Ucb2i7BFSFdM222sBu64u4yZANtTTeTGGHFqWBysE=s900-c-k-c0x00ffffff-no-rj"
  return (
    <div
      className={isHorizontal ? 'game-item game-item--horizontal' : 'game-item'}
    >
      {action && (
        <Tooltip
          overlayInnerStyle={{ fontSize: 14 }}
          placement='topLeft'
          title={
            action === ActionType.ADD
              ? 'Add to wishlist'
              : 'Remove from wishlist'
          }
          color={rootColor.redColor}
          key={rootColor.whiteColor}
        >
          <button className='game-item__action'>
            {action === ActionType.REMOVE ? (
              <MinusCircleOutlined className='game-item__action__icon' />
            ) : (
              <PlusCircleOutlined className='game-item__action__icon' />
            )}
          </button>
        </Tooltip>
      )}
      <div className='game-item__container'>
        <div
          style={heightImage ? { height: heightImage } : {}}
          className='game-item__image'
        >
          <img 
            src={game.imageGameDetail.length === 0 
              ? urlGameDefault
              : game.imageGameDetail[0].url
            } 
            alt='game-item' 
          />
        </div>
        <div className='game-item__detail-wrapper'>
          <p className='game-item__detail-wrapper__name'>{game.nameGame}</p>
          <p className='game-item__detail-wrapper__type'>Nhập vai</p>
          <div className='game-item__detail-wrapper__price-container'>
            {game.discount !== null ? (
              <div className='price-container__sale-container'>
                <div className='price-container__sale'>
                  <p>-{game.discount}%</p>
                </div>
                <p className='price-container__cost'>{game.cost}</p>
              </div>
            ) : null}

            <p className='price-container__current-price'>
              {game.cost}
            </p>
          </div>
        </div>
      </div>
      {/* <Row gutter={[2, 2]}>
        <Col span={isHorizontal ? 7 : 24}>
          <div className='game-item__image'>
            <img src={game.image} alt='game-item' />
          </div>
        </Col>

        <Col span={isHorizontal ? 7 : 24}>
          <div className='game-item__detail-wrapper'>
            <p className='game-item__detail-wrapper__name'>{game.name}</p>
            <p className='game-item__detail-wrapper__type'>{game.type}</p>
            <div className='game-item__detail-wrapper__price-container'>
              {game.onSale ? (
                <div className='price-container__sale-container'>
                  <div className='price-container__sale'>
                    <p>-{game.onSale}%</p>
                  </div>
                  <p className='price-container__cost'>{game.cost}</p>
                </div>
              ) : null}

              <p className='price-container__current-price'>
                {game.cost - (game.cost * game.onSale) / 100}
              </p>
            </div>
          </div>
        </Col>
      </Row> */}
    </div>
  );
}

export default GameItem;
