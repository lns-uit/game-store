import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { useEffect, useState } from 'react';
import { gamesInfoMockData } from '../../api/mockData';
import GameItem from '../../components/GameItem/GameItem';
import './styles.css';
import { Row, Col } from 'antd';
import { ActionType } from '../../interfaces/rootInterface';
import MyCarousel from '../../components/MyCarousel/MyCarousel';
import GamesContainer from '../../components/GamesContainer/GamesContainer';
import { rootColor } from '../../constants/rootColor';

function DiscoverScreen() {
  const screens = useBreakpoint();
  useEffect(() => {
    console.log(screens);
  }, [screens]);
  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <MyCarousel
          games={gamesInfoMockData.slice(0, 4)}
          dotsHorizontal={!screens.lg}
        />
      </div>
      <GamesContainer
        gutterHorizontal={30}
        title='TOp game'
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

      {/* <Row gutter={[35, 35]}>
        {gamesInfoMockData.slice(0, 3).map((game, index) => (
          <Col span={8}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: index > 0 ? 30 : 0,
                paddingRight: index === 0 ? 30 : 0,
              }}>
              <GamesContainer title='Top seller'>
                <GameItem isHorizontal game={game} />
              </GamesContainer>
            </div>
          </Col>
        ))}
      </Row> */}
    </div>
  );
}

export default DiscoverScreen;
