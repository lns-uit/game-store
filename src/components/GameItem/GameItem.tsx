import { Tag, Row, Col, Tooltip } from 'antd';
import React, { CSSProperties } from 'react';
import { rootColor } from '../../constants/rootColor';
import { ActionType, GameInfoType } from '../../interfaces/rootInterface';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import './styles.css';

interface GameItemPropsType {
  game: GameInfoType;
  action?: ActionType;
  isHorizontal?: boolean;
  heightImage?: string;
  titleTooltip?: string;
  onClickGameItem?: () => void;
}

function GameItem({
  game,
  action,
  isHorizontal,
  heightImage,
  titleTooltip,
  onClickGameItem,
}: GameItemPropsType) {
  return (
    <div
      className={
        isHorizontal ? 'game-item game-item--horizontal' : 'game-item'
      }>
      {action && (
        <Tooltip
          overlayInnerStyle={{ fontSize: 14 }}
          placement='topLeft'
          title={titleTooltip}
          color={rootColor.redColor}
          key={rootColor.whiteColor}>
          <button className='game-item__action' onClick={onClickGameItem}>
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
          className='game-item__image'>
          <img src={game.image} alt='game-item' />
        </div>
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
      </div>
    </div>
  );
}

export default GameItem;
