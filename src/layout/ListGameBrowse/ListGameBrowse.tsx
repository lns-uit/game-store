import React, { useState } from 'react';
import Sort from '../../components/Sort/Sort';
import GamesBrowse from '../../components/GamesBrowse/GamesBrowse';
import FillterMobile from '../../components/Fillters/FillterMobile';
import Page from '../../components/Page/Page';
import '../../screens/Browse/styles.css';
import './styles.css';
import { GameType, GenreType } from '../../interfaces/rootInterface';

interface Pages {
  genres: GenreType[];
  games: GameType[];
  sortValues: GenreType[];
  handleChangeSortValue: (genre) => void;
  checkCurrentGenreInSortValues: (idGenre) => number;
}

function ListGameBrowse({
  genres,
  games,
  sortValues,
  handleChangeSortValue,
  checkCurrentGenreInSortValues,
}: Pages) {
  return (
    <div className='flex-1-1-auto white'>
      <div className='d-flex space-between'>
        <Sort
          genres={genres}
          sortValues={sortValues}
          handleChangeSortValue={handleChangeSortValue}
          checkCurrentGenreInSortValues={checkCurrentGenreInSortValues}
        />
      </div>
      <GamesBrowse games={games} />
    </div>
  );
}

export default ListGameBrowse;
