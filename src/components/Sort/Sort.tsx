import React, { useState } from 'react';
import { GenreType } from '../../interfaces/rootInterface';
import './styles.css';

var sorts = [
  'All',
  'Alphabetical',
  'New Release',
  'Price Low To High',
  'Price High To Low',
];

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
  const [nameSort, setNameSort] = useState('All');
  const [dropDown, setDropDown] = useState(false);

  const onPressSortValue = (genre: GenreType) => {
    setDropDown(!dropDown);
    handleChangeSortValue(genre);
  };

  const renderCurrentSortValue = () => {
    return sortValues.map(value => (
      <div key={`sort-value-item-${value.idGenre}`} className='sort-value-item'>
        {value.nameGenre}
      </div>
    ));
  };

  const renderGenres = () => {
    return genres.map(genre => {
      const { nameGenre, idGenre } = genre;
      const isInSortValues =
        checkCurrentGenreInSortValues(idGenre) > -1 ? true : false;
      return (
        <li
          key={idGenre}
          className={
            isInSortValues
              ? 'pd-top-bottom-12 pd-left-13 pointer bgr-gray2'
              : 'pd-top-bottom-12 pd-left-13 pointer hover-1'
          }
          onClick={() => onPressSortValue(genre)}>
          <div className='d-flex space-between'>
            <p className='mr-0'>{nameGenre}</p>
            {isInSortValues ? (
              <span className='pd-right-5'>
                <i className='fa fa-check'></i>
              </span>
            ) : null}
          </div>
        </li>
      );
    });
  };

  return (
    <div className='relative'>
      <div
        className='d-flex pointer sort-header'
        onClick={() => setDropDown(!dropDown)}>
        <p className='fs-15 lh-18 gray-1 mr-0 sort-label'>
          Filter by:
          <i className='fa fa-chevron-down icon-down'></i>
        </p>

        {/* <span className='pd-left-right-4 fs-15 lh-18'>{nameSort}</span> */}
        <div className='sort-value-container'>{renderCurrentSortValue()}</div>
      </div>
      <div
        className={
          dropDown === false
            ? 'brg-brown d-inline-block min-width-200 hig-0 absolute visibility-hidden mr-top-8 animition noselect'
            : 'brg-brown d-inline-block min-width-200 absolute mr-top-8 animition z-index-100 noselect'
        }>
        <ul className='list-style-none pd-0 mr-0'>
          {/* {sorts.map(sort => {
            return (
              <li
                className={
                  nameSort === sort
                    ? 'pd-top-bottom-12 pd-left-13 pointer bgr-gray2'
                    : 'pd-top-bottom-12 pd-left-13 pointer hover-1'
                }
                onClick={() => {
                  setNameSort(sort), setDropDown(!dropDown);
                }}>
                <div className='d-flex space-between'>
                  <p className='mr-0'>{sort}</p>
                  {nameSort === sort ? (
                    <span className='pd-right-5'>
                      <i className='fa fa-check'></i>
                    </span>
                  ) : null}
                </div>
              </li>
            );
          })} */}
          {renderGenres()}
        </ul>
      </div>
    </div>
  );
}

export default Sort;
