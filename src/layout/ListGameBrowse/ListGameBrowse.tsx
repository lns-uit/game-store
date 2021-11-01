import React, { useState } from 'react';
import Sort from '../../components/Sort/Sort';
import GamesBrowse from '../../components/GamesBrowse/GamesBrowse';
import Page from '../../components/Page/Page';
import './styles.css';

interface Pages{
  page: number;
}

function ListGameBrowse({
  page
}:Pages) {
  return(
    <div className="flex-1-1-auto white">
      <Sort></Sort>
      <GamesBrowse page={page}></GamesBrowse>
      <Page page={page}></Page>
    </div>
  );
}

export default ListGameBrowse;
