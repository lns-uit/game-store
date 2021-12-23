import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LayoutGameDetail1 from '../../layout/LayoutGameDetail1/LayoutGameDetail1';
import LayoutGameDetail2 from '../../layout/LayoutGameDetail2/LayoutGameDetail2';
import gamesApi from '../../api/gamesApi';
import { BillType, GameDetailss } from '../../interfaces/rootInterface';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import axios from 'axios';
import { Endpoint } from '../../api/endpoint';
import GameDetailLoading from './GameDetailLoading';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

function GameDetail() {
  const slug = useParams();
  const [game, setGame] = useState<GameDetailss>();
  const [bill, setBill] = useState<BillType>();
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const { idUser } = user || {};

  const fetchGameData = async () => {
    const response = await gamesApi.getGameDetail(slug);
    if (response) {
      setGame(response);
    }
  };
  const checkIsBought = (idUser: any, idGame: any) => {
    if (idUser === undefined || idGame === undefined) return;
    axios
      .get(
        Endpoint.mainApi +
          'api/collection/is-own-by-user/' +
          idUser +
          '/' +
          idGame
      )
      .then(res => {
        setBill(res.data);
      })
      .catch(err => {});
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGameData();
  }, [location.pathname]);

  useEffect(() => {
    checkIsBought(idUser, game?.idGame);
  }, [user, game]);

  // useEffect(() => {
  //   const currentPath = location.pathname;
  //   if (currentPath.indexOf(game?.idGame || '') > -1) {
  //     console.log('reload');
  //     window.location.reload();
  //   }
  // }, [location]);

  return (
    <div>
      {!game?.idGame ? (
        <GameDetailLoading></GameDetailLoading>
      ) : (
        <div style={{ marginTop: '30px' }}>
          <Helmet>
            <title> {game.nameGame} </title>
          </Helmet>
          <LayoutGameDetail1 game={game} bill={bill} />
          <LayoutGameDetail2 game={game} bill={bill} />
        </div>
      )}
    </div>
  );
}

export default GameDetail;
