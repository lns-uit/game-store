import React from 'react';
import { gamesInfoMockData } from '../../api/mockData';
import MyCarousel from '../../components/MyCarousel/MyCarousel';

function DiscoverScreen() {
  return (
    <div>
      <MyCarousel games={gamesInfoMockData} />
    </div>
  );
}

export default DiscoverScreen;
