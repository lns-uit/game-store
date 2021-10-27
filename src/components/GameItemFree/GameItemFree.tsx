import React from 'react';
import { GameInfoType } from '../../interfaces/rootInterface';
import './styles.css';

interface GameItemFreePropsType {
  game: GameInfoType;
}

function GameItemFree({ game }: GameItemFreePropsType) {
  return (
    <div className='game-item game-item--free'>
      <div className='game-item__image game-item__image--free'>
        <img
          className='game-item__image'
          src={game.image}
          alt='game-item-free'
        />
        <div className='game-item-free__tag'>free now</div>
      </div>
      <div className='game-item-free__description'>
        <p className='game-item-free__description__title'>{game.name}</p>
        <p className='game-item-free__description__subtitle'>
          Free now 12:45AM Sep 14 2020
        </p>
      </div>
    </div>
  );
}

export default GameItemFree;
