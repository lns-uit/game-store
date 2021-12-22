import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import getPostTitleSuggestion from '../../utils/getPostTitleSuggestion';
import useGameSuggestion from '../../hooks/useGameSuggestion';
import ListGameBrowse from '../../layout/ListGameBrowse/ListGameBrowse';
import SpinLoading from '../../components/SpinLoading/SpinLoading';
import { Helmet } from 'react-helmet';
function SuggestionScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const { title = '' } = useParams<any>() || {};
  const titleSuggestion: string = getPostTitleSuggestion(title);

  const { games, isLoading, hasMore } = useGameSuggestion({
    currentPage,
    title: titleSuggestion,
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

  return (
    <div className='browse white'>
      <Helmet>
        {' '}
        <title> Stun Store | {titleSuggestion} </title>{' '}
      </Helmet>
      <ListGameBrowse games={games} lastGameRef={lastGameRef} />
      {isLoading && <SpinLoading />}
    </div>
  );
}

export default SuggestionScreen;
