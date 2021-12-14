import React, { useCallback, useEffect, useRef, useState } from 'react';
import ListGameBrowse from '../../layout/ListGameBrowse/ListGameBrowse';
import SpinLoading from '../../components/SpinLoading/SpinLoading';
import './styles.css';
import genresApi from '../../api/genresApi';
import { GenreType } from '../../interfaces/rootInterface';
import OrderBy from '../../components/OrderBy/OrderBy';
import Sort from '../../components/Sort/Sort';
import useGames from '../../hooks/useGames';

const ORDER_BY = ['abc', 'new-release', 'price-to-high', 'price-to-low'];

function BrowseScreen() {
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [sortValues, setSortValues] = useState<GenreType[]>([]);
  const [valueOrderBy, setValueOrderBy] = useState(ORDER_BY[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const { games, isLoading, hasMore } = useGames({
    currentPage,
    sortValues,
    valueOrderBy,
  });

  const observer = useRef<any>();
  const lastGameRef = useCallback(
    node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        console.log(entries);
        if (entries[0].isIntersecting && hasMore) {
          console.log('visible');
          setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );
  const checkCurrentGenreInSortValues = (idGenre: string) => {
    return sortValues.findIndex(value => value.idGenre == idGenre);
  };

  const onClickOrderByValue = value => {
    setValueOrderBy(value);
  };

  const handleChangeSortValue = (value: GenreType) => {
    const indexValue = checkCurrentGenreInSortValues(value.idGenre);
    if (indexValue > -1) {
      setSortValues([
        ...sortValues.slice(0, indexValue),
        ...sortValues.slice(indexValue + 1),
      ]);
    } else {
      setSortValues([...sortValues, value]);
    }
  };

  const fetchData = async () => {
    const resGenre = await genresApi.getGenresApi();
    if (Array.isArray(resGenre)) {
      setGenres(resGenre);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='browse white'>
      <OrderBy
        valueOrderBy={valueOrderBy}
        valuesOrderBy={ORDER_BY}
        onClickOrderByValue={onClickOrderByValue}
      />
      <Sort
        genres={genres}
        sortValues={sortValues}
        handleChangeSortValue={handleChangeSortValue}
        checkCurrentGenreInSortValues={checkCurrentGenreInSortValues}
      />
      <ListGameBrowse games={games} lastGameRef={lastGameRef} />
      {isLoading && <SpinLoading />}
    </div>
  );
}

export default BrowseScreen;
