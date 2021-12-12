import React, { useEffect, useState } from 'react';
import Fillter from '../../components/Fillters/Fillter';
import ListGameBrowse from '../../layout/ListGameBrowse/ListGameBrowse';
import FillterMobile from '../../components/Fillters/FillterMobile';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'antd';
import './styles.css';
import { parse } from 'path';
import genresApi from '../../api/genresApi';
import { GameType, GenreType } from '../../interfaces/rootInterface';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function BrowseScreen() {
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [games, setGames] = useState<GameType[]>([]);
  const [sortValues, setSortValues] = useState<GenreType[]>([]);

  const checkCurrentGenreInSortValues = (idGenre: string) => {
    return sortValues.findIndex(value => value.idGenre == idGenre);
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
    const res = await genresApi.getGenresApi();
    if (Array.isArray(res)) {
      setGenres(res);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='browse'>
      <Row gutter={[8, 8]}>
        <Col>
          <ListGameBrowse
            genres={genres}
            games={games}
            sortValues={sortValues}
            handleChangeSortValue={handleChangeSortValue}
            checkCurrentGenreInSortValues={checkCurrentGenreInSortValues}
          />
        </Col>
      </Row>
    </div>
  );
}

export default BrowseScreen;
