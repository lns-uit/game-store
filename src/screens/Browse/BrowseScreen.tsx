import React from 'react';
import Fillter from '../../components/Fillters/Fillter';
import ListGameBrowse from '../../layout/ListGameBrowse';
import {useLocation} from "react-router-dom";
import './styles.css';
import { parse } from 'path';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function BrowseScreen() {
  const page = parseInt(useQuery().get('page')||'0');

  return(
    <div className="d-gird grid-col-auto-auto gap-104">
      <Fillter></Fillter>
      <ListGameBrowse page={page}></ListGameBrowse>
    </div>
  );
}

export default BrowseScreen;
