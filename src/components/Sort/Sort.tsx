import React, { useState } from 'react';
import { GenreType } from '../../interfaces/rootInterface';
import './styles.css';

interface SortPropsType {
  genres: GenreType[];
  sortValues: GenreType[];
  handleChangeSortValue: (genre) => void;
  checkCurrentGenreInSortValues: (idGenre) => number;
}

function Sort({
  genres,
  sortValues,
  handleChangeSortValue,
  checkCurrentGenreInSortValues,
}: SortPropsType) {
  const onPressSortValue = (genre: GenreType) => {
    handleChangeSortValue(genre);
  };

  const renderGenres = () => {
    return genres?.map((genre, index) => {
      let className = 'order-by-value';
      const { nameGenre, idGenre } = genre;
      if (checkCurrentGenreInSortValues(idGenre) > -1) {
        className += ' active';
      }
      return (
        <button onClick={() => onPressSortValue(genre)} className={className}>
          {nameGenre}{' '}
        </button>
      );
    });
  };

  return (
    <div className='order-by-container'>
      <div className='order-by-label'>Filter by: </div>
      <div className='order-by-wrapper'>{renderGenres()}</div>
    </div>
  );
}

export default Sort;
