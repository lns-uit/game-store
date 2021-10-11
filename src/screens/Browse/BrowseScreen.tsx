import React from 'react';
import Fillter from '../../components/Fillters/Fillter';
import './styles.css';

function BrowseScreen() {
  return(
    <div className="d-flex">
      <Fillter></Fillter>
      <div>khoi map dit</div>
    </div>
  );
}

export default BrowseScreen;
