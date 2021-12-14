import React, { useEffect, useState } from 'react';
import gamesApi from '../api/gamesApi';
import { GameType, GenreType } from '../interfaces/rootInterface';

function useGames({
  currentPage,
  sortValues,
  valueOrderBy,
}: {
  currentPage: number;
  sortValues: GenreType[];
  valueOrderBy: string;
}) {
  const [games, setGames] = useState<GameType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadGame = async (
    count: number,
    listGenreDetail: string[],
    sortBy: string,
    start: number,
    action: string
  ) => {
    console.log({ count, listGenreDetail, sortBy, start });

    const resGame = await gamesApi.getGameByGenre({
      listGenreDetail,
      count,
      start: action == 'new' ? 0 : start,
      sortBy,
    });
    if (Array.isArray(resGame)) {
      console.log(resGame);
      if (start == 0) {
        setGames(resGame);
      } else {
        setGames(prevGame => [...prevGame, ...resGame]);
      }
      setHasMore(resGame.length > 0);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setGames([]);
    const listGenreDetail = sortValues.map(value => value.idGenre);
    loadGame(10, listGenreDetail, valueOrderBy, 0, 'new');
  }, [sortValues, valueOrderBy]);

  useEffect(() => {
    setIsLoading(true);
    const listGenreDetail = sortValues.map(value => value.idGenre);
    loadGame(10, listGenreDetail, valueOrderBy, games.length, '');
  }, [currentPage]);

  return { games, isLoading, hasMore };
}

export default useGames;
