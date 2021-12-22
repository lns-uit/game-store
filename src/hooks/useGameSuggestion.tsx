import React, { useEffect, useState } from 'react';
import { getGameSuggestionApi } from '../api/suggestionApi';
import { GameType, GenreType } from '../interfaces/rootInterface';

function useGameSuggestion({
  currentPage,
  title,
}: {
  currentPage: number;
  title: string;
}) {
  const [games, setGames] = useState<GameType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadGame = async (title: string, count: number, start: number) => {
    const res = await getGameSuggestionApi(title, count, start);
    if (Array.isArray(res)) {
      setGames(prevGame => [...prevGame, ...res]);
      setHasMore(res.length > 0);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    loadGame(title, 10, games.length);
  }, [currentPage]);

  return { games, isLoading, hasMore };
}

export default useGameSuggestion;
