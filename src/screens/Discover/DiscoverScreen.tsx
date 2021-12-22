import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { useEffect, useState, useRef, useContext } from "react";
import { gamesInfoMockData } from "../../api/mockData";
import { LoadingContext } from "react-router-loading";
import GameItem from "../../components/GameItem/GameItem";
import GameItemFree from "../../components/GameItemFree/GameItemFree";
import { Helmet } from "react-helmet";
import "./styles.css";
import { Row, Col, Button, Radio } from "antd";
import {
  ActionType,
  GameInfoType,
  GameType,
} from "../../interfaces/rootInterface";
import Slides from "../../components/Slides/Slides";
import GamesContainer from "../../components/GamesContainer/GamesContainer";
import ViewMoreBtn from "../../components/ViewMoreBtn/ViewMoreBtn";
import { rootColor } from "../../constants/rootColor";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import numOfItemInGrid from "../../utils/numOfItemInGrid";
import DiscoverLoading from "../../components/LoadingComponent/DiscoverLoading";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
const numOfItemsDisplay = {
  freeNow: 4,
  mostPopular: 4,
  topGamesWeek: 6,
};

const EMPTYARR = ["", "", ""];

function DiscoverScreen() {
  const loadingContext = useContext(LoadingContext);
  const screens = useBreakpoint();
  const [wishListChange,setWishlistChange] = useState(0);
  const discover = useSelector((state: RootState) => state.discoverGame);
  const {
    isLoading,gameData,itemsFree,topGamesWeek,mostPopular,
    topSellers,newRelease,freeGames,topGamesMonth,gameOnSales,mostFavorite
  } = discover;
  const topGamesWeekRef = useRef<any>(null);
  const handleSlide = (action) => {
    const ox = topGamesWeekRef.current.offsetWidth;
    if (action === "next") {
      topGamesWeekRef.current.scrollLeft += ox;
    } else {
      topGamesWeekRef.current.scrollLeft -= ox;
    }
  };

  return (
    <div>
        {isLoading !== null && isLoading >=10 ?  
        <div className="discover-screen">
          <Helmet>
            {" "}
            <title> Stun Store | Discover </title>{" "}
          </Helmet>
          <div style={{ marginBottom: 40, marginTop: 40 }}>
            <Slides gameData={gameData} />
          </div>
          {/* Top game week */}
          <GamesContainer
            title="Top Games Week !"
            leftAction={<ActionLeftTopGameWeek handleSlide={handleSlide} />}
          >
            <Row
              ref={topGamesWeekRef}
              className="top-game-week"
              gutter={[35, 35]}
            >
              {topGamesWeek?.map((game, index) => (
                <Col
                  key={`game-info-top-game-week-${index}`}
                  xxl={numOfItemInGrid(numOfItemsDisplay.topGamesWeek)}
                  xl={numOfItemInGrid(numOfItemsDisplay.topGamesWeek)}
                  lg={numOfItemInGrid(numOfItemsDisplay.topGamesWeek/1.5)}
                  md={numOfItemInGrid(numOfItemsDisplay.topGamesWeek / 1.5)}
                  sm={numOfItemInGrid(numOfItemsDisplay.topGamesWeek / 2)}
                  xs={numOfItemInGrid(numOfItemsDisplay.topGamesWeek / 3)}
                >
                  <GameItem game={game} action={ActionType.ADD} wishListChange={wishListChange} setWishlistChange={setWishlistChange} />
                </Col>
              ))}
            </Row>
          </GamesContainer>

          {/* Free now */}

          <GamesContainer
            gutterHorizontal={30}
            title="FREE NOW !"
            leftAction={<ViewMoreBtn title="free-now" />}
            backgroundColor={rootColor.grayContainerColor}
          >
            <Row gutter={[35, 35]}>
              {itemsFree?.map((game, index) => (
                <Col
                  key={`game-info-free-now-${index}`}
                  xxl={numOfItemInGrid(numOfItemsDisplay.freeNow)}
                  xl={numOfItemInGrid(numOfItemsDisplay.freeNow)}
                  lg={numOfItemInGrid(numOfItemsDisplay.freeNow / 2)}
                  md={numOfItemInGrid(numOfItemsDisplay.freeNow / 2)}
                  sm={numOfItemInGrid(numOfItemsDisplay.freeNow / 2)}
                  xs={numOfItemInGrid(numOfItemsDisplay.freeNow / 2)}
                >
                  {game.discount !== null ?
                    <GameItemFree game={game} heightImage="25vw" />
                    : null  
                  }
                
                </Col>
              ))}
            </Row>
          </GamesContainer>
          {/* Game on sales */}
          <GamesContainer title="GAMES ON SALE !" leftAction={<ViewMoreBtn title="game-on-sales" />}>
            <Row gutter={[35, 35]}>
              {gameOnSales?.map((game, index) => (
                <Col
                  key={`game-info-most-popular-${index}`}
                  xxl={numOfItemInGrid(numOfItemsDisplay.mostPopular)}
                  xl={numOfItemInGrid(numOfItemsDisplay.mostPopular)}
                  lg={numOfItemInGrid(numOfItemsDisplay.mostPopular / 2)}
                  md={numOfItemInGrid(numOfItemsDisplay.mostPopular / 2)}
                  sm={numOfItemInGrid(numOfItemsDisplay.mostPopular / 2)}
                  xs={numOfItemInGrid(numOfItemsDisplay.mostPopular / 2)}
                >
                  <GameItem
                    game={game}
                    action={ActionType.ADD}
                    heightImage="23vw"
                    wishListChange={wishListChange} setWishlistChange={setWishlistChange} 
                  />
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
                key={`ab4-${index}`}
              >
                <div
                  className={
                    index !== EMPTYARR.length - 1
                      ? "games-container-horizontal"
                      : ""
                  }
                >
                  {index === 0 ?  <GamesContainer
                    key={`abc-${index}`}
                    gutterHorizontal={30}
                    title="Top Seller"
                    leftAction={<ViewMoreBtn title="top-sellers" />}
                  >
                    <>
                      {topSellers?.map((game, index) => (
                        <div style={{ marginBottom: 20 }}>
                          <GameItem game={game} isHorizontal />
                        </div>
                      ))}
                    </>
                  </GamesContainer> : null}
                  {index === 1 ?  <GamesContainer
                    key={`abc-${index}`}
                    gutterHorizontal={30}
                    title="Free Games"
                    leftAction={<ViewMoreBtn title='free-games' />}
                  >
                    <>
                      {freeGames?.map((game, index) => (
                        <div style={{ marginBottom: 20 }}>
                          <GameItem game={game} isHorizontal />
                        </div>
                      ))}
                    </>
                  </GamesContainer> :null}
                  {index === 2 ?  <GamesContainer
                    key={`abc-${index}`}
                    gutterHorizontal={30}
                    title="New Release"
                    leftAction={<ViewMoreBtn title='new-release' />}
                  >
                    <>
                      {newRelease?.map((game, index) => (
                        <div style={{ marginBottom: 20 }}>
                          <GameItem game={game} isHorizontal />
                        </div>
                      ))}
                    </>
                  </GamesContainer> :null}
                 
                </div>
              </Col>
            ))}
          </Row>

          <GamesContainer title="MOST POPULAR !" leftAction={<ViewMoreBtn title="most-popular" />}>
            <Row gutter={[35, 35]}>
              {mostPopular?.map((game, index) => (
                <Col
                  key={`game-info-most-popular-${index}`}
                  xxl={numOfItemInGrid(numOfItemsDisplay.mostPopular)}
                  xl={numOfItemInGrid(numOfItemsDisplay.mostPopular)}
                  lg={numOfItemInGrid(numOfItemsDisplay.mostPopular / 2)}
                  md={numOfItemInGrid(numOfItemsDisplay.mostPopular / 2)}
                  sm={numOfItemInGrid(numOfItemsDisplay.mostPopular / 2)}
                  xs={numOfItemInGrid(numOfItemsDisplay.mostPopular / 2)}
                >
                  <GameItem
                    game={game}
                    action={ActionType.ADD}
                    heightImage="23vw"
                    wishListChange={wishListChange} setWishlistChange={setWishlistChange} 
                  />
                </Col>
              ))}
            </Row>
          </GamesContainer>
         
        </div> : <DiscoverLoading></DiscoverLoading> }
    </div>
  );
}

const ActionLeftTopGameWeek = ({
  handleSlide,
}: {
  handleSlide: (action: string) => void;
}) => {
  return (
    <div className="action-left-top-game-week">
      <ButtonPrimary
        borderColor={rootColor.grayContainerColor}
        containerColor={rootColor.grayContainerColor}
        styleClass="action-left-top-game-week__btn"
        text={<LeftOutlined />}
        callback={() => handleSlide("prev")}
      />
      <ButtonPrimary
        borderColor={rootColor.grayContainerColor}
        containerColor={rootColor.grayContainerColor}
        styleClass="action-left-top-game-week__btn"
        text={<RightOutlined />}
        callback={() => handleSlide("next")}
      />
    </div>
  );
};

export default DiscoverScreen;
