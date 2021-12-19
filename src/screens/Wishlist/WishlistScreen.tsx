import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import wishlistApi from '../../api/wishlistApi';
import GameItem from '../../components/GameItem/GameItem';
import { ActionType, GameType } from '../../interfaces/rootInterface';
import { RootState } from '../../redux/reducers';
import './styles.css';

function WishlistScreen() {
  const [games, setGames] = useState<GameType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const user = useSelector((state: RootState) => state.user);
  const loadGames = async (start: number, count: number = 10) => {
    const { idUser } = user || {};
    if (idUser) {
      const res = await wishlistApi.getGameWishListByUser(idUser, start, count);
      if (Array.isArray(res)) {
        if (res.length === 0) {
          setHasMore(false);
        } else {
          const gamesFromData = res.map(i => i.game);
          setGames([...games, ...gamesFromData]);
        }
      }
    }
  };

  const removeFromWishList = (gameRemoved: GameType) => {
    setGames(prevGame =>
      prevGame.filter(game => game.idGame !== gameRemoved.idGame)
    );
  };

  useEffect(() => {
    if (hasMore) {
      loadGames(games.length, 4);
    }
  }, [games, hasMore]);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className='wish-list-screen'>
      <p className='wish-list-title'>Your wish list</p>
      <Row>
        {games.map((game, index) => {
          return (
            <Col
              // change to id game
              style={{ marginBottom: 20 }}
              key={`game-info-${Math.floor(Math.random() * 10000000)}`}
              xxl={6}
              xl={8}
              lg={24}
              md={12}
              sm={12}
              xs={24}>
              <div className='pd-left-right-10 pd-bottom-30 m-bottom-12'>
                <GameItem
                  callbackRemoveFromWishList={removeFromWishList}
                  game={game}
                  action={ActionType.REMOVE}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default WishlistScreen;
