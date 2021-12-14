import React, { useState } from 'react';
import Sort from '../../components/Sort/Sort';
import GamesBrowse from '../../components/GamesBrowse/GamesBrowse';
import OrderBy from '../../components/OrderBy/OrderBy';
import '../../screens/Browse/styles.css';
import './styles.css';
import { GameType, GenreType } from '../../interfaces/rootInterface';

interface Pages {
  games: GameType[];
  lastGameRef: any;
}

function ListGameBrowse({ games, lastGameRef }: Pages) {
  return (
    <div className='flex-1-1-auto white'>
      <GamesBrowse games={games} lastGameRef={lastGameRef} />
    </div>
  );
}

export default ListGameBrowse;
