import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { useEffect } from 'react';
import { gamesInfoMockData } from '../../api/mockData';
import MyCarousel from '../../components/MyCarousel/MyCarousel';

function DiscoverScreen() {
  const screens = useBreakpoint();
  useEffect(() => {
    console.log(screens);
  }, [screens]);
  return (
    <div>
      <MyCarousel games={gamesInfoMockData} dotsHorizontal={!screens.xl} />
    </div>
  );
}

export default DiscoverScreen;
