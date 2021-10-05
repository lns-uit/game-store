import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { useEffect, useState } from 'react';
import { gamesInfoMockData } from '../../api/mockData';
import GameItem from '../../components/GameItem/GameItem';
import './styles.css';
import { Row, Col } from 'antd';
import { ActionType } from '../../interfaces/rootInterface';
import MyCarousel from '../../components/MyCarousel/MyCarousel';
import Slides from '../../components/Slides/Slides';
import GamesContainer from '../../components/GamesContainer/GamesContainer';
import { rootColor } from '../../constants/rootColor';

function DiscoverScreen() {
  const screens = useBreakpoint();
  useEffect(() => {
    console.log(screens);
  }, [screens]);
  return (
    <div>
      {/* this is mock*/}
      {/* test on preview */}
      <div style={{ marginBottom: 40, marginTop: 40 }}>
        <Slides />
      </div>
      <MyCarousel games={gamesInfoMockData.slice(0, 6)} />
      <GamesContainer
        gutterHorizontal={30}
        title='Top game'
        leftAction=''
        backgroundColor={rootColor.grayContainerColor}>
        <Row gutter={[35, 35]}>
          {gamesInfoMockData.map((game, index) => (
            <Col
              key={`game-info-${index}`}
              xxl={4}
              xl={6}
              lg={6}
              md={8}
              sm={12}
              xs={24}>
              <GameItem game={game} action={ActionType.REMOVE} />
            </Col>
          ))}
        </Row>
      </GamesContainer>
    </div>
  );
}

export default DiscoverScreen;
