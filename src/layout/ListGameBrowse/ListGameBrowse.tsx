import React, { useState } from 'react';
import Sort from '../../components/Sort/Sort';
import GamesBrowse from '../../components/GamesBrowse/GamesBrowse';
import FillterMobile from '../../components/Fillters/FillterMobile';
import Page from '../../components/Page/Page';
import '../../screens/Browse/styles.css'
import './styles.css';

interface Pages{
  page: number;
}

function ListGameBrowse({
  page
}:Pages) {
  return(
    <div className="flex-1-1-auto white">
      <div className="d-flex space-between">
          <Sort />
          <div className="fillter-mobile">
            <FillterMobile/>
          </div>
      </div>
      <GamesBrowse page={page}/>
      <Page page={page}/>
    </div>
  );
}

export default ListGameBrowse;