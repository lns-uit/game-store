import { Tag } from 'antd';
import React from 'react';
import { rootColor } from '../../constants/rootColor';
import { ActionType, GameInfoType } from '../../interfaces/rootInterface';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import './styles.css';

interface GameItemPropsType {
  game: GameInfoType;
  action?: ActionType;
}

function GameItem({ game, action }: GameItemPropsType) {
  return (
    <div className='game-item'>
      {action && (
        <button className='game-item__action'>
          {action === ActionType.REMOVE ? (
            <MinusCircleOutlined className='game-item__action__icon' />
          ) : (
            <PlusCircleOutlined className='game-item__action__icon' />
          )}
        </button>
      )}
      <div className='game-item__image'>
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
  );
}

export default GameItem;
