import React from 'react';
import { GameInfoType } from '../../interfaces/rootInterface';
import './styles.css';

interface GameItemFreePropsType {
  game: GameInfoType;
  heightImage?: string;
}

function GameItemFree({ game, heightImage }: GameItemFreePropsType) {
  return (
    <div className='game-item game-item--free'>
      <div
        style={heightImage ? { height: heightImage } : {}}
        className='game-item__image game-item__image--free'
      >
        <div className='game-item__tag-free'>free now</div>
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
