import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { useEffect, useState, useRef } from 'react';
import { gamesInfoMockData } from '../../api/mockData';
import GameItem from '../../components/GameItem/GameItem';
import GameItemFree from '../../components/GameItemFree/GameItemFree';
import './styles.css';
import { Row, Col, Button, Radio } from 'antd';
import {
  ActionType,
  GameInfoType,
  GameType,
} from '../../interfaces/rootInterface';
import Slides from '../../components/Slides/Slides';
import GamesContainer from '../../components/GamesContainer/GamesContainer';
import ViewMoreBtn from '../../components/ViewMoreBtn/ViewMoreBtn';
import { rootColor } from '../../constants/rootColor';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import numOfItemInGrid from '../../utils/numOfItemInGrid';

const numOfItemsDisplay = {
  freeNow: 4,
  mostPopular: 4,
  topGamesWeek: 6,
};

const EMPTYARR = ['', '', ''];

function DiscoverScreen() {
  const screens = useBreakpoint();
  const [itemsFree, setItemsFree] = useState<GameType[]>([]);
  // gamesInfoMockData.slice(0, 4)
  const [topGamesWeek, setTopGamesWeek] = useState<GameType[]>([]);
  // gamesInfoMockData.slice(0, 10)
  const [mostPopular, setMostPopular] = useState<GameType[]>([]);
  // gamesInfoMockData.slice(0, 4)
  const topGamesWeekRef = useRef<any>(null);
  const handleSlide = action => {
    const ox = topGamesWeekRef.current.offsetWidth;
    if (action === 'next') {
      topGamesWeekRef.current.scrollLeft += ox;
    } else {
      topGamesWeekRef.current.scrollLeft -= ox;
    }
  };

  return (
    <div className='discover-screen'>
      <div style={{ marginBottom: 40, marginTop: 40 }}>
        <Slides />
      </div>
      {/* Top game week */}
      <GamesContainer
        title='Top Games Week !'
        leftAction={<ActionLeftTopGameWeek handleSlide={handleSlide} />}>
        <Row ref={topGamesWeekRef} className='top-game-week' gutter={[35, 35]}>
          {topGamesWeek.map((game, index) => (
            <Col
              key={`game-info-top-game-week-${index}`}
              xxl={numOfItemInGrid(numOfItemsDisplay.topGamesWeek)}
              xl={numOfItemInGrid(numOfItemsDisplay.topGamesWeek)}
              lg={numOfItemInGrid(numOfItemsDisplay.topGamesWeek / 2)}
              md={numOfItemInGrid(numOfItemsDisplay.topGamesWeek / 2)}
              sm={numOfItemInGrid(numOfItemsDisplay.topGamesWeek / 3)}
              xs={numOfItemInGrid(numOfItemsDisplay.topGamesWeek / 3)}>
              <GameItem game={game} action={ActionType.ADD} />
            </Col>
          ))}
        </Row>
      </GamesContainer>

      {/* Free now */}

      <GamesContainer
        gutterHorizontal={30}
        title='FREE NOW !'
        leftAction={<ViewMoreBtn />}
        backgroundColor={rootColor.grayContainerColor}>
        <Row gutter={[35, 35]}>
          {itemsFree.map((game, index) => (
            <Col
              key={`game-info-free-now-${index}`}
              xxl={numOfItemInGrid(numOfItemsDisplay.freeNow)}
              xl={numOfItemInGrid(numOfItemsDisplay.freeNow)}
              lg={numOfItemInGrid(numOfItemsDisplay.freeNow / 2)}
              md={numOfItemInGrid(numOfItemsDisplay.freeNow / 2)}
              sm={numOfItemInGrid(numOfItemsDisplay.freeNow / 2)}
              xs={numOfItemInGrid(numOfItemsDisplay.freeNow / 2)}>
              <GameItemFree game={game} heightImage='25vw' />
            </Col>
          ))}
        </Row>
      </GamesContainer>
      {/* Top Seller */}
      <Row>
        {EMPTYARR.map((arr, index) => (
          <Col
            xxl={8}
            xl={8}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            key={`ab4-${index}`}>
            <div
              className={
                index !== EMPTYARR.length - 1
                  ? 'games-container-horizontal'
                  : ''
              }>
              <GamesContainer
                key={`abc-${index}`}
                gutterHorizontal={30}
                title='Top Seller'
                leftAction={<ViewMoreBtn />}>
                <>
                  {itemsFree.map((game, index) => (
                    <div style={{ marginBottom: 20 }}>
                      <GameItem game={game} isHorizontal />
                    </div>
                  ))}
                </>
              </GamesContainer>
            </div>
          </Col>
        ))}
      </Row>

      <GamesContainer title='MOST POPULAR !' leftAction={<ViewMoreBtn />}>
        <Row gutter={[35, 35]}>
          {mostPopular.map((game, index) => (
            <Col
              key={`game-info-most-popular-${index}`}
              xxl={numOfItemInGrid(numOfItemsDisplay.mostPopular)}
              xl={numOfItemInGrid(numOfItemsDisplay.mostPopular)}
              lg={numOfItemInGrid(numOfItemsDisplay.mostPopular / 2)}
              md={numOfItemInGrid(numOfItemsDisplay.mostPopular / 2)}
              sm={numOfItemInGrid(numOfItemsDisplay.mostPopular / 2)}
              xs={numOfItemInGrid(numOfItemsDisplay.mostPopular / 2)}>
              <GameItem
                game={game}
                action={ActionType.ADD}
                heightImage='23vw'
              />
            </Col>
          ))}
        </Row>
      </GamesContainer>
    </div>
  );
}

const ActionLeftTopGameWeek = ({
  handleSlide,
}: {
  handleSlide: (action: string) => void;
}) => {
  return (
    <div className='action-left-top-game-week'>
      <ButtonPrimary
        borderColor={rootColor.grayContainerColor}
        containerColor={rootColor.grayContainerColor}
        styleClass='action-left-top-game-week__btn'
        text={<LeftOutlined />}
        callback={() => handleSlide('prev')}
      />
      <ButtonPrimary
        borderColor={rootColor.grayContainerColor}
        containerColor={rootColor.grayContainerColor}
        styleClass='action-left-top-game-week__btn'
        text={<RightOutlined />}
        callback={() => handleSlide('next')}
      />
    </div>
  );
};

export default DiscoverScreen;
